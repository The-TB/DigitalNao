import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/entity/property.entity';
import { PropertyService } from 'src/service/property.service';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Property])],
    providers: [PropertyService],
    exports: [PropertyService],
})
export class PropertyModule { }