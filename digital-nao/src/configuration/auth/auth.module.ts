import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('auth.secret'),
                signOptions: { expiresIn: configService.get<number>('auth.expiration') },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }