import { Injectable } from '@nestjs/common';
import { CreateSpecialDto } from './dto/create-special.dto';
import { UpdateSpecialDto } from './dto/update-special.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Special } from './entities/special.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialService {
  constructor(
    @InjectRepository(Special) 
    private specialRepository : Repository<Special>
  ){}
  
  async create(createSpecialDto: CreateSpecialDto) {
    return await this.specialRepository.save(createSpecialDto)
  }

  async findAll() {
    return await this.specialRepository.find()
  }

  async findOne(id: number) {
    return await this.specialRepository.findOne({where:{id:id}})
  }

  async update(id: number, updateSpecialDto: UpdateSpecialDto) {
    return await this.specialRepository.update(id,updateSpecialDto)
  }

  async remove(id: number) {
    return await this.specialRepository.delete(id)
  }
}
