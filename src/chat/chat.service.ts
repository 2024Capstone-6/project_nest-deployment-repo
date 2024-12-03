import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private repository: Repository<Chat>,
  ) {}

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    const newChat = this.repository.create(createChatDto);
    return await this.repository.save(newChat);
  }

  async findAll(boardId: number): Promise<Chat[]> {
    return this.repository.find({ where: { boardId } });
  }

  async findOne(id: number): Promise<Chat> {
    const chat = await this.repository.findOneBy({ id });
    if (!chat) {
      throw new NotFoundException(`댓글 ID ${id}를 찾을 수 없습니다.`);
    }
    return chat;
  }

  async update(id: number, updateChatDto: UpdateChatDto): Promise<Chat> {
    await this.findOne(id); // 존재 여부 확인
    await this.repository.update(id, updateChatDto);
    return this.findOne(id); // 업데이트 후 변경된 엔티티 반환
  }

  async remove(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`댓글 ID ${id}를 찾을 수 없습니다.`);
    }
  }
}