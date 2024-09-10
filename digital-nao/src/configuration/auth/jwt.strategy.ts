import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt.payload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor( configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('auth.secret'),
            signOptions: { expiresIn: configService.get<number>('auth.expiration') },
        });
    }

    async validate(payload: JwtPayload) {
        return { userId: payload.id, username: payload.username, email: payload.email };
    }
}