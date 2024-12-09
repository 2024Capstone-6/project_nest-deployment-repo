import { PartialType } from '@nestjs/mapped-types';
import { CreateJapaneseDto } from './create-activity.dto';

export class UpdateJapaneseDto extends PartialType(CreateJapaneseDto) {}
