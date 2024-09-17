import { Module } from "@nestjs/common";
import { UserModule } from "../../modules/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }