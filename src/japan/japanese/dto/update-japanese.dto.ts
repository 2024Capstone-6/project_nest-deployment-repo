import { PartialType } from '@nestjs/mapped-types';

// 기존에 정의된 CreateJapaneseDto를 가져옴
import { CreateJapaneseDto } from './create-japanese.dto';

// UpdateJapaneseDto: 일본어 게시물 수정 시 사용되는 DTO
// PartialType을 사용하여 CreateJapaneseDto의 모든 필드를 선택적으로 만듦
export class UpdateJapaneseDto extends PartialType(CreateJapaneseDto) {}
