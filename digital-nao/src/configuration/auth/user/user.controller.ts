import { Controller, Get, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '../guard/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('all')
    async getUsers(): Promise<User[]> {
        try {
        return await this.userService.getUsers();
        }
        catch (e) {
            throw new HttpException(e.message,HttpStatus.BAD_REQUEST)
        }
    }

    @Get('allSTP')
    async getUsersfromSTP(): Promise<User[]> {
        try {
            return await this.userService.getUsersfromSTP();
            }
            catch (e) {
                throw new HttpException(e.message,HttpStatus.BAD_REQUEST)
            }
    }
}
