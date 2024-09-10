import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserModule } from './configuration/auth/user/user.module';
// import { UserController } from './configuration/auth/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './configuration/auth/user/user.module';
import { AuthModule } from './configuration/auth/auth.module';
// import { UserServiceImpl } from './configuration/auth/user/impl/user.service.impl';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule,AuthModule],
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
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
