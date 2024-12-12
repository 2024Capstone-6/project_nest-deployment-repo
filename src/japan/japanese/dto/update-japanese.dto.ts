import { PartialType } from '@nestjs/mapped-types';

// 기존에 정의된 CreateJapaneseDto를 가져옴
import { CreateJapaneseDto } from './create-japanese.dto';

export class UpdateJapaneseDto extends PartialType(CreateJapaneseDto) {}
