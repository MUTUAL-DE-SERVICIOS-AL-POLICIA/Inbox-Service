import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkflowArea } from './workflow-area.entity';
import { Workflow } from './workflow.entity';

@Entity('workflow_sequences')
export class WorkflowSequence {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workflow, (workflow) => workflow.sequences, { nullable: false })
  @JoinColumn({ name: 'workflow_id' })
  workflow: Workflow;

  @ManyToOne(() => WorkflowArea, { nullable: false })
  @JoinColumn({ name: 'from_wf_area_id' })
  fromWfArea: WorkflowArea;

  @ManyToOne(() => WorkflowArea, { nullable: false })
  @JoinColumn({ name: 'to_wf_area_id' })
  toWfArea: WorkflowArea;
}
