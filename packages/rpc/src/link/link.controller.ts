import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto, CreateLinkBodyDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  async create(
    @Body() createLinkDto: CreateLinkBodyDto,
  ) {
    try {
      const created = await this.linkService.create(
        createLinkDto,
      );
      return {
        ok: true,
        message: 'Link created successfully',
        data: {
          link: created.shortUrl,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: 'Internal Server Error',
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const link = await this.linkService.findOneByShortUrl(id);
      return {
        ok: true,
        message: 'Link found',
        data: link,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: 'Internal Server Error',
      };
    }
  }

  // @Post()
  // create(@Body() createLinkDto: CreateLinkDto) {
  //   return this.linkService.create(createLinkDto);
  // }

  // @Get()
  // findAll() {
  //   return this.linkService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.linkService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
  //   return this.linkService.update(+id, updateLinkDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.linkService.remove(+id);
  // }
}
