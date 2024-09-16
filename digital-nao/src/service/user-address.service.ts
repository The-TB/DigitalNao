import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GenericResponseDTO } from 'src/configuration/auth/dto/generic-response.dto';
import { UserAddressDTO } from 'src/entity/dto/user-address.dto';
import { UserAddress } from 'src/entity/user-address.entity';
import { UserAddressRepository } from 'src/repository/user-address.respository';
import { PropertyService } from './property.service';

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

    async addAddress(address: UserAddressDTO): Promise<GenericResponseDTO<boolean>> {
        if (address.id)
            throw new HttpException('id is not allowed here.', HttpStatus.NOT_ACCEPTABLE)

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

    async updateAddress(address: UserAddressDTO): Promise<GenericResponseDTO<boolean>> {
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

    async deleteAddress(address: UserAddressDTO): Promise<GenericResponseDTO<boolean>> {
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