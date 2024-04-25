import { Injectable } from '@nestjs/common';
import { CreateLinkDto, CreateLinkBodyDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { Repository } from 'typeorm';
import { LinkLog } from './entities/link-log.entity';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
    @InjectRepository(LinkLog)
    private readonly linkLogRepository: Repository<LinkLog>,
  ) {}
  
  async create(createLinkDto: CreateLinkBodyDto) {
    let generatedShortUrl = await this.generatedShortUrl();
    const userData = this.linkRepository.create({
      ...createLinkDto,
      shortUrl: generatedShortUrl,
    });
    return this.linkRepository.save(userData);
  }

  findAll() {
    return this.linkRepository.find();
  }

  findOne(id: number) {
    return this.linkRepository.findOneBy({
      id,
    })
  }

  findOneByShortUrl(shortUrl: string) {
    return this.linkRepository.findOneBy({
      shortUrl,
    });
  }

  createLog(link: Link, userAgent: string, ipAddress: string) {
    const logData = this.linkLogRepository.create({
      userAgent,
      ipAddress,
      accessedAt: new Date(),
      link,
    });
    return this.linkLogRepository.save(logData);
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link`;
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }

  private async generatedShortUrl() {
    const gen = () => {
      const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
      const minLen = 6;
      const maxLen = 10;
      const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
      let shortUrl = '';
      for (let i = 0; i < length; i++) {
        shortUrl += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
      }
      return shortUrl;
    }
    let shortUrl = gen();
    console.log(shortUrl);
    while (await this.linkRepository.findOneBy({ shortUrl })) {
      shortUrl = gen();
      console.log(shortUrl);
    }
    return shortUrl;
  }
}
