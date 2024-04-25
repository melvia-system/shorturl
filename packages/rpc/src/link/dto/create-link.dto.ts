import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateLinkDto {
  originalUrl: string;
  shortUrl: string;
}

export class CreateLinkBodyDto {
  @IsNotEmpty()
  @IsString()
  originalUrl: string;
}