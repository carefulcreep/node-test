import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { LocalService } from './local.service';
import { VenueCreateDto } from './dto/venue.create.dto';
import { VenueQueryDto } from './dto/venue.query.dto';
import { VenuePatchDto } from './dto/venue.patch.dto';
import { VenuePatchResponseDto } from './dto/venue.patch.response.dto';

@ApiTags('test')
@Controller('test')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Post('/')
  @ApiOperation({ summary: 'Add a new venue' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'New venue was added',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    type: Error,
    description: 'Bad request',
  })
  add(@Body() body: VenueCreateDto): Promise<any> {
    return this.localService.add(body);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all venues' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'All entries were provided',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    type: Error,
    description: 'Bad request',
  })
  getAll(): Promise<any> {
    return this.localService.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get venue by id' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Venue was found',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    type: Error,
    description: 'Bad request',
  })
  getById(@Param('id') id: string): Promise<any> {
    return this.localService.getById(id);
  }

  @Get('search/venue')
  @ApiOperation({ summary: 'Get venue by query' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Venue was found',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    type: Error,
    description: 'Bad request',
  })
  getByQuery(@Query() query: VenueQueryDto): Promise<any> {
    return this.localService.getByQuery(query);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update venue data' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Venue was updated',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    type: Error,
    description: 'Bad request',
  })
  patch(
    @Param('id') id: string,
    @Body() body: VenuePatchDto,
  ): Promise<VenuePatchResponseDto> {
    return this.localService.patch(id, body);
  }
}
