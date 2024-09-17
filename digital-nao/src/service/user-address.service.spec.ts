import { Test, TestingModule } from '@nestjs/testing';
import { UserAddressService } from './user-address.service';
import { PropertyService } from './property.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserAddressRepository } from '../repository/user-address.respository';
import { CreateAddressDTO } from '../entity/dto/create-address.dto';
import { DeleteAddressDTO } from '../entity/dto/delete-address.dto';
import { UpdateAddressDTO } from '../entity/dto/update-address.dto';

describe('UserAddressService', () => {
    let service: UserAddressService;
    let userAddressRepository: UserAddressRepository;
    let propertyService: PropertyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserAddressService,
                {
                    provide: UserAddressRepository,
                    useValue: {
                        getAddresses: jest.fn(),
                        addAddress: jest.fn(),
                        updateAddress: jest.fn(),
                        deleteAddress: jest.fn(),
                    },
                },
                {
                    provide: PropertyService,
                    useValue: {
                        getPropertyByCode: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UserAddressService>(UserAddressService);
        userAddressRepository = module.get<UserAddressRepository>(UserAddressRepository);
        propertyService = module.get<PropertyService>(PropertyService);
    });

    describe('addAddress', () => {
        it('should throw error if mandatory fields are missing', async () => {
            const createAddressDTO: CreateAddressDTO = {
                id_username: 1,
                country_code: '',
                zipcode: null,
                address_1: '',
                receptor_name: '',
                phone_number: '',
                address_2: ''
            };

            await expect(service.addAddress(createAddressDTO)).rejects.toThrow(
                new HttpException('mandatory param is missing.', HttpStatus.BAD_REQUEST),
            );
        });

        it('should throw error if max address limit is reached', async () => {
            jest.spyOn(propertyService, 'getPropertyByCode').mockResolvedValue({ code: 'ADDRESS_LIMIT', value: '1', description: 'test' });
            jest.spyOn(userAddressRepository, 'getAddresses').mockResolvedValue([{
                id: 1,
                id_username: '',
                is_active: 0,
                country_code: '',
                zipcode: 0,
                address_1: '',
                address_2: '',
                receptor_name: '',
                phone_number: 0,
                previous_id: 0
            }, {
                id: 2,
                id_username: '',
                is_active: 0,
                country_code: '',
                zipcode: 0,
                address_1: '',
                address_2: '',
                receptor_name: '',
                phone_number: 0,
                previous_id: 0
            }]); // Simula que ya tiene 2 direcciones

            const createAddressDTO: CreateAddressDTO = {
                id_username: 1,
                country_code: 'MX',
                zipcode: 64000,
                address_1: 'Calle 1',
                receptor_name: 'Juan',
                phone_number: '55555555',
                address_2: ''
            };

            await expect(service.addAddress(createAddressDTO)).rejects.toThrow(
                new HttpException('Max addresses reached.', HttpStatus.NOT_ACCEPTABLE),
            );
        });

        it('should return success if address is added', async () => {
            jest.spyOn(propertyService, 'getPropertyByCode').mockResolvedValue({ code: 'ADDRESS_LIMIT', value: '10', description: 'test' });
            jest.spyOn(userAddressRepository, 'getAddresses').mockResolvedValue([]); // Simula que no hay direcciones
            jest.spyOn(userAddressRepository, 'addAddress').mockResolvedValue(true);

            const createAddressDTO: CreateAddressDTO = {
                id_username: 1,
                country_code: 'MX',
                zipcode: 64000,
                address_1: 'Calle 1',
                receptor_name: 'Juan',
                phone_number: '55555555',
                address_2: ''
            };

            const result = await service.addAddress(createAddressDTO);

            expect(result).toEqual({ result: true, message: 'Address created.', statusCode: HttpStatus.CREATED });
        });
    });

    describe('updateAddress', () => {
        it('should throw error if id is missing', async () => {
            const updateAddressDTO: UpdateAddressDTO = {
                id: null,
                country_code: 'MX',
                zipcode: 64000,
                address_1: 'Calle 1',
                receptor_name: 'Juan',
                phone_number: '55555555',
                address_2: ''
            };

            await expect(service.updateAddress(updateAddressDTO)).rejects.toThrow(
                new HttpException('id must be present.', HttpStatus.NOT_ACCEPTABLE),
            );
        });

        it('should return success if address is updated', async () => {
            jest.spyOn(userAddressRepository, 'updateAddress').mockResolvedValue(true);

            const updateAddressDTO: UpdateAddressDTO = {
                id: 1,
                country_code: 'MX',
                zipcode: 64000,
                address_1: 'Calle 1',
                receptor_name: 'Juan',
                phone_number: '55555555',
                address_2: ''
            };

            const result = await service.updateAddress(updateAddressDTO);

            expect(result).toEqual({ result: true, message: 'Address updated.', statusCode: HttpStatus.CREATED });
        });
    });

    describe('deleteAddress', () => {
        it('should throw error if id is missing', async () => {
            const deleteAddressDTO: DeleteAddressDTO = { id: null };

            await expect(service.deleteAddress(deleteAddressDTO)).rejects.toThrow(
                new HttpException('id must be present.', HttpStatus.NOT_ACCEPTABLE),
            );
        });

        it('should return success if address is deleted', async () => {
            jest.spyOn(userAddressRepository, 'deleteAddress').mockResolvedValue(true);

            const deleteAddressDTO: DeleteAddressDTO = { id: 1 };

            const result = await service.deleteAddress(deleteAddressDTO);

            expect(result).toEqual({ result: true, message: 'Address deleted.', statusCode: HttpStatus.CREATED });
        });
    });
});
