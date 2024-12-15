// 유틸리티 함수, 모든 속성을 선택적으로 설정한 새로운 DTO 생성
// 기존 DTO를 기반으로 재사용성과 코드 간결성을 높일 수 있음
import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {}
// UpdateActivityDto 클래스를 정의, CreateActivityDto 클래스를 확장하여 업데이트할 데이터를 받음
