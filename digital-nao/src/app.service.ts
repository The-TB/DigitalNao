import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return __dirname + '/../src/**/*.entity{.ts,.js}';
  }
}
