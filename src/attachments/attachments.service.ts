import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './attachment.entity';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private repo: Repository<Attachment>,
  ) {}

  create(data: Partial<Attachment>) {
    const att = this.repo.create(data);
    return this.repo.save(att);
  }

  findByGrade(gradeId: number) {
    return this.repo.find({ where: { gradeId } });
  }
}
