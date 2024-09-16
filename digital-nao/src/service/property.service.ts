import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entity/property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertyService {

    constructor(
        @InjectRepository(Property) private readonly userRepository: Repository<Property>,
    ) {}

    async getPropertyByCode(code: string) {
        return await this.userRepository.findOne({ where: { code } });
    }
}