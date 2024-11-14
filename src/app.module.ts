import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JapanModule } from './japan/japan.module';

@Module({
  imports: [JapanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
