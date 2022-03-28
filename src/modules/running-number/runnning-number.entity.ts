import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'RUNNING_NUMBERS' })
export class RunningNumberEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'Purpose' })
  purpose: string;

  @Column({ name: 'AutoNumber', type: 'numeric' })
  autoNumber: number;
}
