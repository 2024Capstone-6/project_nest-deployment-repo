import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivitiesPost } from '../entities/activities/activities.entity';

@Injectable()
export class ActivitiesPostService {
  constructor(
    @InjectRepository(ActivitiesPost)
    private activitiesPostRepository: Repository<ActivitiesPost>,
  ) {}

  async create(activitiesPostData: ActivitiesPost): Promise<ActivitiesPost> {
    const newPost = this.activitiesPostRepository.create(activitiesPostData);
    return this.activitiesPostRepository.save(newPost);
  }
}
