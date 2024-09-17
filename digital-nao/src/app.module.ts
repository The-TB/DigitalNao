import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user.module';
import { AuthModule } from './configuration/auth/auth.module';
import { GlobalJwtModule } from './configuration/auth/jwt.module';
import { UserAddressModule } from './modules/user-address.module';
import { PropertyModule } from './modules/property.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.host'),
        port: +configService.get<number>('db.port'),
        database: configService.get('db.name'),
        username: configService.get('db.user'),
        password: configService.get('db.pass'),
        synchronize: false,
        entities: ["dist/**/*.entity.js"],
      })
    }),
    GlobalJwtModule,
    PropertyModule,
    AuthModule,
    UserModule,
    UserAddressModule    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
