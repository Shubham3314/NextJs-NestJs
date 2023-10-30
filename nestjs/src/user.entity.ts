import { File } from 'buffer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({unique:true})
  email: string;

  @Column()
  password: string;

  @Column()
  profieimg: string;
}