import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AwsModule } from 'src/aws/aws.module';
import { Chat } from './entities/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]),AwsModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
