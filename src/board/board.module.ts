import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { AwsModule } from './board_aws/aws.module';

@Module({
  imports:[TypeOrmModule.forFeature([Board]),AwsModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
