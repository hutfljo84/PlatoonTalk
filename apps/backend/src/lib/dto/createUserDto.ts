import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FullTime, Rank, Section, Usergrp } from '.prisma/client';

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
  @IsNotEmpty()
  @ApiProperty()
  public rank!: Rank;

  // Validates for a non-empty integer array
  @IsString()
  @MaxLength(75)
  @IsNotEmpty()
  @ApiProperty()
  public name!: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  public email!: string;

  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  @ApiProperty()
  public address1!: string;

  @IsString()
  @MaxLength(150)
  @ApiProperty()
  public address2!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public city!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public state!: string;

  @IsNumber()
  @Max(99999)
  @Min(0)
  @IsNotEmpty()
  @ApiProperty()
  public postal!: number;

  @IsString()
  @IsNotEmpty()
  public phone!: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public passReset!: number;

  @IsEnum(FullTime)
  @IsNotEmpty()
  @ApiProperty()
  public ftStaff!: FullTime;

  public lastActivity!: Date;

  public createdAt!: Date;

  public updatedAt!: Date;

  public section!: Section;

  public userGrp!: Usergrp;

  public requestReg!: boolean;
}
