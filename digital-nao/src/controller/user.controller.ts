import { Controller, Get, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { AuthGuard } from '../configuration/auth/guard/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@UseGuards(AuthGuard)
@ApiTags('user')
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'No autorizado.' })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('all')
    @ApiOperation({ summary: 'Devuelve todos los usuarios del sistema.' })
    @ApiResponse({ status: 200, description: 'Se encontraron resultados.' })
    async getUsers(): Promise<User[]> {
        try {
        return await this.userService.getUsers();
        }
        catch (e) {
            throw new HttpException(e.message,HttpStatus.BAD_REQUEST)
        }
    }

    @Get('allSTP')
    @ApiOperation({ summary: 'Devuelve todos los usuarios del sistema. A través de SP.' })
    @ApiResponse({ status: 200, description: 'Se encontraron resultados.' })
    async getUsersfromSTP(): Promise<User[]> {
        try {
            return await this.userService.getUsersfromSTP();
            }
            catch (e) {
                throw new HttpException(e.message,HttpStatus.BAD_REQUEST)
            }
    }
}
