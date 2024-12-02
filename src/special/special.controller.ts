import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SpecialService } from './special.service';
import { CreateSpecialDto } from './dto/create-special.dto';
import { UpdateSpecialDto } from './dto/update-special.dto';
import { Special } from './entities/special.entity';

@Controller('special')
export class SpecialController {
  constructor(private readonly specialService: SpecialService) {}
  
  @Post()
  create(@Body() createSpecialDto: CreateSpecialDto) { 
    return this.specialService.create(createSpecialDto);
  }
  
  @Get()
  findAll() {
    return this.specialService.findAll();
  }
  
  @Get()
  findOne(@Param('access_token') id: string) {
    return this.specialService.findOne(id); 
  }
  // @Get('auth')
  // findauth(){
  //   return this.specialService.findauth();
  // }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateSpecialDto: UpdateSpecialDto) {
    return this.specialService.update(+id, updateSpecialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialService.remove(+id);
  }
}
