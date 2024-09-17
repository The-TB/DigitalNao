import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto/auth.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('auth')
@ApiTags('Login')
@ApiResponse({ status: 401, description: 'Credenciales no válidas.' })
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('token')
    @ApiOperation({ summary: 'Hacer Login, revisar AuthDTO para mas usuarios de prueba.' })
    @ApiResponse({ status: 201, description: 'Devuelve access_token y expiración.' })
    async login(@Body() authDTO: AuthDTO) {
        const user = await this.authService.validate(authDTO);
        if (!user) {
            throw new UnauthorizedException('Credenciales no válidas.');
        }
        return this.authService.login(user);
    }
}