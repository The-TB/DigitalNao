import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from '../repository/user.repository';

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