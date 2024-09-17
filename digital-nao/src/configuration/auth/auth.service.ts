import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { UserService } from "../../service/user.service";
import { AuthDTO } from "./dto/auth.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor
    (private readonly userService: UserService
    ,private readonly jwtService: JwtService
    ,private configService: ConfigService) { }

    async validate(loginDto : AuthDTO) {
        const user = await this.userService.getUserByUsername(loginDto.username)
        
        if (user && await bcryptjs.compare(loginDto.password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, email: user.email, id: user.id };
        const expiresIn = this.configService.get<string>('auth.expiration');
        return {
            access_token: this.jwtService.sign(payload, { expiresIn }),
            expires_in: expiresIn,
        };
    }
}