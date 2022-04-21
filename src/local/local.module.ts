import { Module } from '@nestjs/common';
import { LocalService } from './local.service';
import { LocalController } from './local.controller';
import { LocalRepository } from '../repositories/local.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [TypeOrmModule.forFeature([LocalRepository]), ConfigModule],
  controllers: [LocalController],
  providers: [LocalService],
})
export class LocalModule {}
