import { PartialType } from '@nestjs/mapped-types';
import { CreateUserdtDto } from './create-userdt.dto';

export class UpdateUserdtDto extends PartialType(CreateUserdtDto) {}
