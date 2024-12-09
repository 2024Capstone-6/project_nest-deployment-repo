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

  async findOne(token: string) {
    try {
      const author = await this.jwtservice.verify(token, { secret: process.env.JET_SECRET}) ;  
      
      // return await this.specialRepository.findOne({ where: { author: author.nickname }});
      return author
    } catch (error) {
      console.error('Invalid token', error);
      throw new Error('Invalid token or authentication error');
    }
  }

  async update(id: number, updateSpecialDto: UpdateSpecialDto) {
    return await this.specialRepository.update({id:id},updateSpecialDto)
  }

  async remove(id: number) {
    return await this.specialRepository.delete({id:id})
  }

}
