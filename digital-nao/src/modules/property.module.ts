import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../entity/property.entity';
import { PropertyService } from '../service/property.service';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Property])],
    providers: [PropertyService],
    exports: [PropertyService],
})
export class PropertyModule { }