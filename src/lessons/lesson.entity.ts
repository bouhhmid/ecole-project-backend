import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Axe } from '../axes/axe.entity';
import { Grade } from '../grades/grade.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  youtubeUrl: string;

  @Column({ nullable: true })
  imageUrls: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column()
  gradeId: number;

  @Column()
  axisId: number;

}
