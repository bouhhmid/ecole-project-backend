import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private repo: Repository<Exercise>,
  ) {}

  findByGrade(gradeId: number) {
    return this.repo.find({ where: { gradeId } });
  }

  create(data: Partial<Exercise>) {
    const exercise = this.repo.create(data);
    return this.repo.save(exercise);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
