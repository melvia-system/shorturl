import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateLinkLogDto {
  userAgent: string;
  ipAddress: string;
  accessedAt: Date;
}