import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  gradeId: number;
}
