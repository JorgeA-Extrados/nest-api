import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { User } from './interfaces/user.interface';


@Injectable()
export class AuthService {
  constructor(@InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = new this.userModel({
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      });
      const userToken = {
        email: user.email,
        password: user.password,
        fullName: user.fullName,
        isActive: user.isActive,
        roles: user.roles,
        token: this.getJwtToken({_id: user._id})
      }
      await user.save();
      return userToken
    } catch (error) {
      console.log(error);
      this.handleDBErros(error)
    }
  }

  async loginUser( loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userModel.findOne({ email: email }).select('password email')
    if (!user) {
      throw new UnauthorizedException('Credentials are not valid (Email)')
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid (Password)')
    }
    
    return {
      user,
      token: this.getJwtToken({_id: user._id})
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);    
    return token
  }

  //Manejo de Errores
  private handleDBErros(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error)
    }

    console.log(error);

    throw new InternalServerErrorException('Please chech server logs')
    
  }
}
