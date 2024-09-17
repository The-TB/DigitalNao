import { ApiProperty } from "@nestjs/swagger";

export class UpdateAddressDTO {
    @ApiProperty({ description: 'id del registro, internamente se relciona con el id del usuario logeado', example: 100 })
    id: number;
    id_username?: number;
    @ApiProperty({ description: 'Código del país', example: 'MX' })
    country_code: string;
    @ApiProperty({ description: 'Código Postal', example: '64000' })
	zipcode: number;
    @ApiProperty({ description: 'Direccion1', example: 'Calle Washington' })
	address_1: string;
    @ApiProperty({ description: 'Direccion2', example: 'Casa 400' })
	address_2: string;
    @ApiProperty({ description: 'Destinatario', example: 'Gustavo Jaime' })
	receptor_name: string;
    @ApiProperty({ description: 'Número celular', example: '8100110000' })
	phone_number: string;

    toString(): string {
        return `UserAddress [id=${this.id}, id_username=${this.id_username}, country_code=${this.country_code}, zipcode=${this.zipcode}, address_1=${this.address_1}, address_2=${this.address_2}, receptor_name=${this.receptor_name}, phone_number=${this.phone_number}]`;
    }
}