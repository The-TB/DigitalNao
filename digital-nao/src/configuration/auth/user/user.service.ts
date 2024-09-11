import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly userCustomRepository: UserRepository
    ) {}

    async getUserByUsername(user: string) {
        const username = user.toLowerCase();
        return await this.userRepository.findOne({ where: { username } });
    }

    async getUsers() {
        return await this.userRepository.find();
    }

    async getUsersfromSTP(): Promise<User[]> {
        const rawResults = await this.userCustomRepository.getUsers();
        return rawResults;
    }
}