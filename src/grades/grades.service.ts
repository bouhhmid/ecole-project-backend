import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './grade.entity';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
  ) {}

  // CREATE (teacher)
  async create(data: Partial<Grade>): Promise<Grade> {
    const grade = this.gradeRepository.create(data);
    return this.gradeRepository.save(grade);
  }

  // READ ALL (student + teacher)
  async findAll(): Promise<Grade[]> {
    return this.gradeRepository.find();
  }

  // READ ONE (student + teacher)
  async findOne(id: number): Promise<Grade> {
    const grade = await this.gradeRepository.findOne({ where: { id } });

    if (!grade) {
      throw new NotFoundException('Grade non trouvé');
    }

    return grade;
  }

  // UPDATE (teacher)
  async update(id: number, data: Partial<Grade>): Promise<Grade> {
    const grade = await this.findOne(id);
    Object.assign(grade, data);
    return this.gradeRepository.save(grade);
  }

  // DELETE (teacher)
  async remove(id: number): Promise<void> {
    const grade = await this.findOne(id);
    await this.gradeRepository.remove(grade);
  }
}
