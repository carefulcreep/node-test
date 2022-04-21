import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocalModule } from './local/local.module';
import { ConfigModule } from './config/config.module';
import { ConnectionsModule } from './connections/connections.module';

@Module({
  imports: [LocalModule, ConfigModule, ConnectionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
