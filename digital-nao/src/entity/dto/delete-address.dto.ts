import { ApiProperty } from "@nestjs/swagger";

export class DeleteAddressDTO {
    @ApiProperty({ description: 'id del registro, internamente se relciona con el id del usuario logeado', example: 100 })
    id: number;
    id_username?: number;

    toString(): string {
        return `UserAddress [id=${this.id}`
    }
}