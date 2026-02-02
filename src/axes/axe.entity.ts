import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToMany } from 'typeorm';
import { Grade } from '../grades/grade.entity';
import { Lesson } from '../lessons/lesson.entity';
@Entity()
export class Axe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Grade, grade => grade.axes, { onDelete: 'CASCADE' })
  grade: Grade;

  @OneToMany(() => Lesson, lesson => lesson.axisId)
  lessons: Lesson[];
}
