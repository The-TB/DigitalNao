import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('auth.secret'),
                signOptions: { expiresIn: configService.get<string>('auth.expiration') },
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [JwtModule]
})
export class GlobalJwtModule { }
