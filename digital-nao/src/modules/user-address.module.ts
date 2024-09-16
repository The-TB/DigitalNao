import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddressController } from "src/controller/user-address.controller";
import { UserAddress } from 'src/entity/user-address.entity';
import { UserAddressRepository } from 'src/repository/user-address.respository';
import { UserAddressService } from 'src/service/user-address.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserAddress])],
    providers: [UserAddressService, UserAddressRepository],
    controllers: [UserAddressController],
    exports: [UserAddressService, UserAddressRepository],
})
export class UserAddressModule {}
