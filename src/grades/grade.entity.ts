import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';
import { Axe } from '../axes/axe.entity';
@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Axe, axe => axe.grade)
  axes: Axe[];
}
