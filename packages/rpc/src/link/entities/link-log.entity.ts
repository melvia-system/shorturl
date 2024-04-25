import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Link } from './link.entity';

@Entity()
export class LinkLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userAgent: string;

  @Column()
  ipAddress: string;

  @Column()
  accessedAt: Date;

  @ManyToOne(() => Link, link => link.logs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'link_id' })
  link: Link;
}
