import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // 🔥 URL Cloudinary ou lien externe
  @Column({ nullable: true })
  fileUrl: string;

  @Column()
  gradeId: number;
}