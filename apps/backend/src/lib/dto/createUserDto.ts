import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FullTime, Rank, Section, Usergrp } from '.prisma/client';
import { Transform } from 'class-transformer';
import sanitizeHtml from 'sanitize-html';

export class createUserDto {
  // Validates for a non-empty string
  @IsNotEmpty()
  @ApiProperty()
  public id!: number;

  @IsNumber()
  public usergrp!: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  public sectionId!: number;

  @IsEnum(Rank)
  @ApiProperty()
  public rank!: Rank;

  // Validates for a non-empty integer array
  @IsString()
  @MaxLength(75)
  @Transform((value: any) => sanitizeHtml(value))
  @ApiProperty()
  public name!: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  public email!: string;

  @IsString()
  @MaxLength(150)
  @Transform((value: any) => sanitizeHtml(value))
  @ApiProperty()
  public address1!: string;

  @IsString()
  @MaxLength(150)
  @Transform((value: any) => sanitizeHtml(value))
  @ApiProperty()
  public address2!: string;

  @IsString()
  @Transform((value: any) => sanitizeHtml(value))
  @ApiProperty()
  public city!: string;

  @IsString()
  @Transform((value: any) => sanitizeHtml(value))
  @ApiProperty()
  public state!: string;

  @IsNumber()
  @MaxLength(5)
  @ApiProperty()
  public postal!: number;

  @IsString()
  @Transform((value: any) => sanitizeHtml(value))
  @IsPhoneNumber('US')
  public phone!: string;

  @IsNumber()
  @ApiProperty()
  public passReset!: number;

  @IsEnum(FullTime)
  @ApiProperty()
  public ftStaff!: FullTime;

  public lastActivity!: Date;

  public createdAt!: Date;

  public updatedAt!: Date;

  public section!: Section;

  public userGrp!: Usergrp;

  public requestReg!: boolean;
}
