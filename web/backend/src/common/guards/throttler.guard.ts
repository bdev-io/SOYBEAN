import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class ProxyThrottler extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const remoteIp =
      req.headers['x-forwarded-for'] ||
      (req.ips.length ? req.ips[0] : req.ip) ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      '';

    return remoteIp;
  }
}
