import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsLatitude, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class VenueCreateDto {
  @ApiProperty({
    type: Number,
    example: 50.3403003,
  })
  @IsLatitude()
  lat: number;

  @ApiProperty({
    type: String,
    example: 'Vancouver',
  })
  @IsString()
  city: string;

  @ApiProperty({
    type: String,
    example: 'email@test.org',
  })
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  email: string;
}
