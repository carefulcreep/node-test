import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class VenuePatchDto {
  @ApiPropertyOptional({
    type: String,
    example: 'Vancouver',
  })
  @IsOptional()
  @IsString()
  city: string;

  @ApiPropertyOptional({
    type: String,
    example: 'email@test.org',
  })
  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  @IsEmail()
  email: string;
}
