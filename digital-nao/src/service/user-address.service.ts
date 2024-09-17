import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GenericResponseDTO } from '../configuration/auth/dto/generic-response.dto';
import { UserAddress } from '../entity/user-address.entity';
import { UserAddressRepository } from '../repository/user-address.respository';
import { PropertyService } from './property.service';
import { CreateAddressDTO } from '../entity/dto/create-address.dto';
import { UpdateAddressDTO } from '../entity/dto/update-address.dto';
import { DeleteAddressDTO } from '../entity/dto/delete-address.dto';

@Injectable()
export class UserAddressService {

    constructor(
        private readonly userAddressRepository: UserAddressRepository,
        private readonly propertyService: PropertyService
    ) {}

    async getAddresses(id_username: number): Promise<UserAddress[]> {
        const result = await this.userAddressRepository.getAddresses(id_username);
        return result;
    }

    async addAddress(address: CreateAddressDTO): Promise<GenericResponseDTO<boolean>> {
        if (!address.country_code || !address.zipcode || !address.address_1 || !address.receptor_name || !address.phone_number)
            throw new HttpException('mandatory param is missing.', HttpStatus.BAD_REQUEST)


        const param = await this.propertyService.getPropertyByCode('ADDRESS_LIMIT');
        const limit = Number(param.value);
        const userAddresses = await this.getAddresses(address.id_username);
        console.log('dir supera limite ? '+ (userAddresses.length > limit));
        
        if (userAddresses.length >= limit)
            throw new HttpException('Max addresses reached.', HttpStatus.NOT_ACCEPTABLE);

        try {
            const result = await this.userAddressRepository.addAddress(address);

            if (!result)
                throw new HttpException('addAddress -> Error.', HttpStatus.UNPROCESSABLE_ENTITY)

            return new GenericResponseDTO(result,'Address created.', HttpStatus.CREATED);
        }
        catch (e) {
            throw new HttpException('addAddress -> Error.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateAddress(address: UpdateAddressDTO): Promise<GenericResponseDTO<boolean>> {
        if (!address.id)
            throw new HttpException('id must be present.', HttpStatus.NOT_ACCEPTABLE)
        
        try {
            const result = await this.userAddressRepository.updateAddress(address);

            if (!result)
                throw new HttpException('updateAddress -> Error.', HttpStatus.NOT_MODIFIED)
    
            return new GenericResponseDTO(result,'Address updated.', HttpStatus.CREATED);
        }
        catch (e) {
            throw new HttpException('updateAddress -> Error.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteAddress(address: DeleteAddressDTO): Promise<GenericResponseDTO<boolean>> {
        if (!address.id)
            throw new HttpException('id must be present.',HttpStatus.NOT_ACCEPTABLE)
        try {
            const result = await this.userAddressRepository.deleteAddress(address);

            if (!result)
                throw new HttpException('deleteAddress -> Error.', HttpStatus.NOT_MODIFIED);

            return new GenericResponseDTO(result,'Address deleted.', HttpStatus.CREATED);
        }
        catch (e) {
            throw new HttpException('deleteAddress -> Error.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}