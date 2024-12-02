import { Injectable } from '@nestjs/common';
import { CreateSpecialDto } from './dto/create-special.dto';
import { UpdateSpecialDto } from './dto/update-special.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Special } from './entities/special.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SpecialService {
  constructor(
    @InjectRepository(Special) 
    private specialRepository : Repository<Special>,
    
    private readonly jwtservice:JwtService
  ){}
  
  async create(createSpecialDto: CreateSpecialDto) {
    return await this.specialRepository.save(createSpecialDto)
  }

  async findAll() {
    return await this.specialRepository.find()
  }

  async findOne(id: string) {
    console.log(id)
    const token = await this.jwtservice.verifyAsync(id,{secret:process.env.JWT_SECRET})
    return await this.specialRepository.findOne({where: {author: token.nickname}})

    // return await this.specialRepository.findOne({where:{id:id}})
  }

  async update(id: number, updateSpecialDto: UpdateSpecialDto) {
    return await this.specialRepository.update({id:id},updateSpecialDto)
  }

  async remove(id: number) {
    return await this.specialRepository.delete({id:id})
  }

}
