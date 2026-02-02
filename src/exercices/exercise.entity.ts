import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // lien externe (PDF Google Drive, image, etc.)
  @Column({ nullable: true })
  fileUrl: string;

  // fichier uploadé (PDF / image)
  @Column({ nullable: true })
  filePath: string;

  @Column()
  gradeId: number;
}
