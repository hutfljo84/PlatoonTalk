import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import sanitizeHtml from 'sanitize-html';

export class createPostDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public id!: number;

  @IsString()
  @MaxLength(75)
  @Transform((value: any) => sanitizeHtml(value))
  @ApiProperty()
  public title!: string;

  @IsString()
  @MaxLength(2000)
  @Transform((value: any) => sanitizeHtml(value))
  @ApiProperty()
  public content!: string;

  public createdAt!: Date;

  public updatedAt!: Date;
}
