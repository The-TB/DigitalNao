import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserAddress } from 'src/entity/user-address.entity';
import { UserAddressDTO } from 'src/entity/dto/user-address.dto';

@Injectable()
export class UserAddressRepository extends Repository<UserAddress> {

    constructor(private dataSource: DataSource) {
        super(UserAddress, dataSource.createEntityManager());
    }

    mapToUserAddresses(rawResult: any[]): UserAddress[] {
        return rawResult.map((row: any) => {
            const address = new UserAddress();
            address.id = row.ID;
            // address.id_username = row.ID_USERNAME;
            address.is_active = row.EMAIL;
            address.country_code = row.COUNTRY_CODE;
            address.zipcode = row.ZIPCODE;
            address.address_1 = row.ADDRESS_1;
            address.address_2 = row.ADDRESS_2;
            address.receptor_name = row.RECEPTOR_NAME;
            address.phone_number = row.PHONE_NUMBER;
            // address.previous_id = row.PREVIOUS_ID;
            return address;
        });
    }

    async getAddresses(id_username: number): Promise<UserAddress[]> {
        try {
            const [rawResult] = await this.dataSource.query(
                'CALL NAODB.GET_USER_ADDRESSES(?)',
                [id_username]);
            console.log('Raw Result: ', rawResult);
            const result = rawResult as any[];
            return this.mapToUserAddresses(result);
        } catch (e) {
            if (e instanceof Error)
                console.error('Repository -> deleteAddress -> Error.', e.name, e.message);
            throw e;
        }
    }

    async addAddress(address: UserAddressDTO): Promise<boolean> {
        try {
            const [rawResult] = await this.dataSource.query(
                'CALL NAODB.ADD_USER_ADDRESS(?,?,?,?,?,?,?)',
                [address.id_username
                ,address.country_code
                ,address.zipcode
                ,address.address_1
                ,address.address_2
                ,address.receptor_name
                ,address.phone_number]);

            const status = rawResult[0]?.status;

            if (status === 'Success') 
                return true;
            else {
                console.warn('Repository -> addAddress -> transaction was not success.');
                return false;
            }
        } catch (e) {
            if (e instanceof Error)
                console.error('Repository -> deleteAddress -> Error.', e.name, e.message);
            throw e;
        }
    }

    async updateAddress(address: UserAddressDTO): Promise<boolean> {
        try {
            const [rawResult] = await this.dataSource.query(
                'CALL NAODB.UPDATE_USER_ADDRESS(?,?,?,?,?,?,?,?)',
                [address.id
                ,address.id_username
                ,address.country_code
                ,address.zipcode
                ,address.address_1
                ,address.address_2
                ,address.receptor_name
                ,address.phone_number]);

            const status = rawResult[0]?.status;

                if (status === 'Success') 
                    return true;
                else {
                    console.warn('Repository -> updateAddress -> transaction was not success.');
                    return false;
                }
        } catch (e) {
            if (e instanceof Error)
                console.error('Repository -> deleteAddress -> Error.', e.name, e.message);
            throw e;
        }
    }

    async deleteAddress(address: UserAddressDTO): Promise<boolean> {
        try {
            const [rawResult] = await this.dataSource.query(
                'CALL NAODB.DELETE_USER_ADDRESS(?,?)',
                [address.id
                ,address.id_username]);

            const status = rawResult[0]?.status;
            if (status === 'Success') 
                return true;
            else {
                console.warn('Repository -> deleteAddress -> transaction was not success.');
                return false;
            }
        } catch (e) {
            if (e instanceof Error)
                console.error('Repository -> deleteAddress -> Error.', e.name, e.message);
            throw e;
        }
    }



}