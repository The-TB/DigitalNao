export class UserAddressDTO {
    id: number;
    id_username: number;
    is_active: number;
    country_code: string;
	zipcode: number;
	address_1: string;
	address_2: string;
	receptor_name: string;
	phone_number: string;
    previous_id: number;

    toString(): string {
        return `UserAddress [id=${this.id}, id_username=${this.id_username}, is_active=${this.is_active}, country_code=${this.country_code}, zipcode=${this.zipcode}, address_1=${this.address_1}, address_2=${this.address_2}, receptor_name=${this.receptor_name}, phone_number=${this.phone_number}, previous_id=${this.previous_id}]`;
    }
}