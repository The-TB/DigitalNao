import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('token')
    async login(@Body() authDTO: AuthDTO) {
        const user = await this.authService.validate(authDTO);
        if (!user) {
            throw new UnauthorizedException('Credenciales no válidas.');
        }
        return this.authService.login(user);
    }
}