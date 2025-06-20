import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getVersion(): string {
    return process.env.VERSION || '0.0.0';
  }
}
