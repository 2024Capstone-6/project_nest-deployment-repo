import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {}
// UpdateActivityDto 클래스를 정의, CreateActivityDto 클래스를 확장하여 업데이트할 데이터를 받음
