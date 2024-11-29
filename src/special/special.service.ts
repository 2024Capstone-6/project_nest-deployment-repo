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
    // private jwtservice:JwtService
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
    return await this.specialRepository.update({id:id},updateSpecialDto)
  }

  async remove(id: number) {
    return await this.specialRepository.delete({id:id})
  }

  // async findauth(){
  //   const auth = sessionStorage.getItem('access_token')
  //   const access_data = this.jwtservice.verifyAsync(auth,{secret:process.env.ACCESS_TOKEN})
  // }
}
