import { Controller, Get, HttpException, Param, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { LinkService } from './link/link.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly linkService: LinkService) {}

  @Get(':shortUrl')
  async getLink(@Res() res: Response, @Req() req: Request, @Param('shortUrl') shortUrl: string) {
    const link = await this.linkService.findOneByShortUrl(shortUrl);
    if (!link) return new HttpException('Not Found', 404);

    // analytics
    // get: user-agent, ip-address
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip;
    await this.linkService.createLog(link, userAgent, ipAddress);

    return res.redirect(link.originalUrl);
  }
}
