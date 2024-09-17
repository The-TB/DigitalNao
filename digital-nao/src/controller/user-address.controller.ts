import { Controller, Get, HttpException, HttpStatus, UseGuards, Request, Post, Body, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from '../configuration/auth/guard/auth.guard';
import { UserAddressService } from '../service/user-address.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAddressDTO } from '../entity/dto/create-address.dto';
import { UpdateAddressDTO } from '../entity/dto/update-address.dto';
import { DeleteAddressDTO } from '../entity/dto/delete-address.dto';


@Controller('user/address')
@UseGuards(AuthGuard)
@ApiTags('userAddress')
@ApiResponse({ status: 401, description: 'No autorizado.' })
@ApiBearerAuth()
export class UserAddressController {
    constructor(private readonly userAddressService: UserAddressService) {}

    @Get('getAll')
    @ApiOperation({ summary: 'Obtener todas las direcciones del usuario logeado.' })
    @ApiResponse({ status: 200, description: 'Datos encontrados.' })
    async getAddresses(@Request() request) {
        const id_username = request.user.id;
        return await this.userAddressService.getAddresses(id_username);
    }

    @Post()
    @ApiOperation({ summary: 'Registrar una nueva dirección del usuario logeado.' })
    @ApiResponse({ status: 201, description: 'Creado.' })
    @ApiResponse({ status: 400, description: 'Petición incorrecta, faltan campos obligatorios.' })
    @ApiResponse({ status: 406, description: 'Se alcanzo el limite de direcciones por usuario.' })
    @ApiResponse({ status: 422, description: 'Ocurrió un error de persistencia.' })
    @ApiResponse({ status: 500, description: 'Error lado del server.' })
    async addAddress(@Request() request, @Body() address: CreateAddressDTO) {
        const id_username = request.user.id;
        address.id_username = id_username;
        console.log('addAddress -> params:');
        console.log(address);
        return await this.userAddressService.addAddress(address);
    }

    @Patch()
    @ApiOperation({ summary: 'Actualizar una dirección del usuario logeado.' })
    @ApiResponse({ status: 201, description: 'Creado.' })
    @ApiResponse({ status: 304, description: 'No se pudo actualizar.' })
    @ApiResponse({ status: 406, description: 'Hace falta un id.' })
    @ApiResponse({ status: 500, description: 'Error lado del server.' })
    async updateAddress(@Request() request, @Body() address: UpdateAddressDTO) {
        const id_username = request.user.id;
        address.id_username = id_username;
        console.log('updateAddress -> params:');
        console.log(address);
        return await this.userAddressService.updateAddress(address);
    }

    @Delete()
    @ApiOperation({ summary: 'Eliminar una dirección del usuario logeado.' })
    @ApiResponse({ status: 201, description: 'Creado.' })
    @ApiResponse({ status: 304, description: 'No se pudo eliminar.' })
    @ApiResponse({ status: 406, description: 'Hace falta un id.' })
    @ApiResponse({ status: 500, description: 'Error lado del server.' })
    async deleteAddress(@Request() request, @Body() address: DeleteAddressDTO) {
        const id_username = request.user.id;
        address.id_username = id_username;
        console.log('deleteAddress -> params:');
        console.log(address);
        return await this.userAddressService.deleteAddress(address);
    }
}
