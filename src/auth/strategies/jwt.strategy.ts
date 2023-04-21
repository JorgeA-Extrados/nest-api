import {PassportStrategy} from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {
        super({
            secretOrKey: process.env.JWT_SECRET || 'Est3EsMISE3Dsecreto32s',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { _id } = payload;

        const user = await this.userModel.findOne({ _id: _id });        

        if (!user) {
            throw new UnauthorizedException('Token not valid')
        }
        if (!user.isActive) {
            throw new UnauthorizedException('User is inactive, talk with an admin')
        }

        return user;
    }
}