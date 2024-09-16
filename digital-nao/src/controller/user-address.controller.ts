import { Controller, Get, HttpException, HttpStatus, UseGuards, Request, Post, Body, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from 'src/configuration/auth/guard/auth.guard';
import { UserAddressDTO } from 'src/entity/dto/user-address.dto';
import { UserAddressService } from 'src/service/user-address.service';

@Controller('user/address')
@UseGuards(AuthGuard)
export class UserAddressController {
    constructor(private readonly userAddressService: UserAddressService) {}

    @Get('getAll')
    async getAddresses(@Request() request) {
        const id_username = request.user.id;
        return await this.userAddressService.getAddresses(id_username);
    }

    @Post()
    async addAddress(@Request() request, @Body() address: UserAddressDTO) {
        const id_username = request.user.id;
        address.id_username = id_username;
        console.log('addAddress -> params:');
        console.log(address);
        return await this.userAddressService.addAddress(address);
    }

    @Patch()
    async updateAddress(@Request() request, @Body() address: UserAddressDTO) {
        const id_username = request.user.id;
        address.id_username = id_username;
        console.log('updateAddress -> params:');
        console.log(address);
        return await this.userAddressService.updateAddress(address);
    }

    @Delete()
    async deleteAddress(@Request() request, @Body() address: UserAddressDTO) {
        const id_username = request.user.id;
        address.id_username = id_username;
        console.log('deleteAddress -> params:');
        console.log(address);
        return await this.userAddressService.deleteAddress(address);
    }
}
