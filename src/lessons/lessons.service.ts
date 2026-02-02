import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  findAll() {
    return this.lessonRepository.find();
  }

  findOne(id: number) {
    return this.lessonRepository.findOneBy({ id });
  }

  findByGrade(gradeId: number) {
    return this.lessonRepository.findBy({ gradeId });
  }

  findByAxis(axisId: number) {
    return this.lessonRepository.findBy({ axisId });
  }

  create(data: Partial<Lesson>) {
    const lesson = this.lessonRepository.create(data);
    return this.lessonRepository.save(lesson);
  }


  update(id: number, data: Partial<Lesson>) {
    return this.lessonRepository.update(id, data);
  }

  remove(id: number) {
    return this.lessonRepository.delete(id);
  }

}

