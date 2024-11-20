import { Module } from '@nestjs/common';
import { SpecialService } from './special.service';
import { SpecialController } from './special.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Special } from './entities/special.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Special])],
  controllers: [SpecialController],
  providers: [SpecialService],
})
export class SpecialModule {}
