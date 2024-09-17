import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddressController } from "../controller/user-address.controller";
import { UserAddress } from '../entity/user-address.entity';
import { UserAddressRepository } from '../repository/user-address.respository';
import { UserAddressService } from '../service/user-address.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserAddress])],
    providers: [UserAddressService, UserAddressRepository],
    controllers: [UserAddressController],
    exports: [UserAddressService, UserAddressRepository],
})
export class UserAddressModule {}
