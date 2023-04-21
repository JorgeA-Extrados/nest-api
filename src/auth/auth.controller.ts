import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './decorators/get-user.decorator';
import { User } from './interfaces/user.interface';
import { RawHeaders } from './decorators/raw-headers.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async createUser(@Res() res, @Body() createUserDto: CreateUserDto) {
      const user = await this.authService.createUser(createUserDto)        
      return res.status(HttpStatus.OK).json({
          message: 'El usuario se creo correctamente',
          user
      })
  }


  @Post('/login')
  async loginUser(@Res() res, @Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.loginUser(loginUserDto)  
    const userToken = {
      email: user.user.email,
      password: user.user.password,
      token: user.token
    }

    return res.status(HttpStatus.OK).json({
        message: 'El usuario se logeo correctamente',
        userToken
    })
  }

  @Get('/private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
    @Res() res,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[]
  ) {
    // console.log({user});    
    // console.log("user 2:", res.req.user);
      return res.status(HttpStatus.OK).json({
        message: 'Estoy cansado',
        user,
        userEmail,
        rawHeaders
      })
  }

  // @SetMetadata('roles', ['admin','super-user'])

  @Get('/private2')
  @RoleProtected( ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
    @GetUser() user:User
  ) {

    return {
      ok: true,
      user
    }
  }

  @Get('/private3')
  @Auth(ValidRoles.admin)
  privateRoute3(
    @GetUser() user:User
  ) {

    return {
      ok: true,
      user
    }
  }

}
