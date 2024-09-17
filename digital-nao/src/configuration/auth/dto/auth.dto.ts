import { ApiProperty } from "@nestjs/swagger";

export class AuthDTO {
    @ApiProperty({ description: 'Usuario, No es sensible a mayúsculas.', example: 'Ornito_24', examples: ['Ornito_24','tavo_FAJARDO','RandomCustomer888'] })
    username: string;
    @ApiProperty({ description: 'Contraseña', example: 'OrnitoElAmigo##579', examples: ['OrnitoElAmigo##579','Letebe#9090','UnCliente+%%555']})
    password: string;
}