import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller()
@ApiTags('Tipos Sprint 1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('types')
  @ApiOperation({ summary: 'Tipos y Colecciones de datos.'})
  getDataTypes(): any {
    return this.appService.getDataTypes();
  }
}
