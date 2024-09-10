import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('token')
    async login(@Body() body: { username: string; password: string }) {
        const { username, password } = body;
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Credenciales no válidas.');
        }
        return this.authService.login(user);
    }
}