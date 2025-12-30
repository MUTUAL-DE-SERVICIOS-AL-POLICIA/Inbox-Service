import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workflow_areas')
export class WorkflowArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'module_id', type: 'int', nullable: false })
  moduleId: number;

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ name: 'shortened', type: 'varchar', length: 50, nullable: true })
  shortened: string;

  @Column({ name: 'sequence_number', type: 'int', nullable: false })
  sequenceNumber: number;

  @Column({ name: 'is_initial', type: 'boolean', default: false })
  isInitial: boolean;

  @Column({ name: 'is_final', type: 'boolean', default: false })
  isFinal: boolean;
}

