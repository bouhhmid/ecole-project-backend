import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Axe } from './axe.entity';

@Injectable()
export class AxesService {
  constructor(
    @InjectRepository(Axe)
    private readonly axeRepository: Repository<Axe>,
  ) {}

  findByGrade(gradeId: number) {
    return this.axeRepository.find({
      where: { grade: { id: gradeId } },
      order: { id: 'ASC' },
    });
  }
  async create(data: { title: string; gradeId: number }) {
    const axe = this.axeRepository.create({
      title: data.title,
      grade: { id: data.gradeId } as any,
    });

    return this.axeRepository.save(axe);
  }

}
