/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService,UserRepository],
    controllers: [UserController],
    exports: [UserService, UserRepository],
})
export class UserModule {}
