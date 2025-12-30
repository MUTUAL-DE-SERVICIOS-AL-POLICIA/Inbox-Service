import { Workflow } from 'src/workflows/entities/workflow.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import { WorkflowArea } from 'src/workflows/entities/workflow-area.entity';
import { WorkflowSequence } from 'src/workflows/entities/workflow-sequence.entity';

export class WorkflowsBaseData implements Seeder {
  private readonly logger = new Logger('Seeder-WorkflowsBaseData');
  track = true;

  private readonly workflows: Partial<Workflow>[] = [
    {
      moduleId: 3,
      name: 'Fondo de Retiro',
      shortened: 'Fondo',
    },
  ];

  private readonly RfWorkflowAreas: Partial<WorkflowArea>[] = [
    {
      moduleId: 3,
      name: 'Área de Recepción Fondo de Retiro',
      shortened: 'Recepción',
      sequenceNumber: 1,
      isInitial: true,
      isFinal: false,
    },
    {
      moduleId: 3,
      name: 'Área de Archivo Fondo de Retiro',
      shortened: 'Archivo',
      sequenceNumber: 2,
      isInitial: false,
      isFinal: false,
    },
    {
      moduleId: 3,
      name: 'Área de Revisión Legal Fondo de Retiro',
      shortened: 'Revisión Legal',
      sequenceNumber: 3,
      isInitial: false,
      isFinal: false,
    },
    {
      moduleId: 3,
      name: 'Área de Cuentas Individuales Fondo de Retiro',
      shortened: 'Cuentas Individuales',
      sequenceNumber: 4,
      isInitial: false,
      isFinal: false,
    },
    {
      moduleId: 3,
      name: 'Área de Calificación Fondo de Retiro',
      shortened: 'Calificación',
      sequenceNumber: 5,
      isInitial: false,
      isFinal: false,
    },
    {
      moduleId: 3,
      name: 'Área de Jefatura Fondo de Retiro',
      shortened: 'Jefatura',
      sequenceNumber: 6,
      isInitial: false,
      isFinal: false,
    },
    {
      moduleId: 3,
      name: 'Área de Liquidación Fondo de Retiro',
      shortened: 'Liquidación',
      sequenceNumber: 7,
      isInitial: false,
      isFinal: false,
    },
    {
      moduleId: 3,
      name: 'Dirección BE',
      shortened: 'Dirección BE',
      sequenceNumber: 8,
      isInitial: false,
      isFinal: false,
    },
    {
      moduleId: 3,
      name: 'Dirección DAA',
      shortened: 'Dirección DAA',
      sequenceNumber: 9,
      isInitial: false,
      isFinal: true,
    },
  ];

  public async run(dataSource: DataSource): Promise<any> {
    this.logger.log('Ejecutando WorkflowsBaseData Seeder');

    await dataSource.transaction(async (manager) => {
      for (const workflow of this.workflows) {
        await manager.getRepository(Workflow).insert(workflow);
      }

      for (const area of this.RfWorkflowAreas) {
        await manager.getRepository(WorkflowArea).insert(area);
      }

      const RfWorkflow = await manager.findOneByOrFail(Workflow, {
        name: 'Fondo de Retiro',
      });

      const receptionArea = await manager.findOneByOrFail(WorkflowArea, {
        name: 'Área de Recepción Fondo de Retiro',
      });
      const fileArea = await manager.findOneByOrFail(WorkflowArea, {
        name: 'Área de Archivo Fondo de Retiro',
      });
      const legalReviewArea = await manager.findOneByOrFail(WorkflowArea, {
        name: 'Área de Revisión Legal Fondo de Retiro',
      });
      const individualAccountsArea = await manager.findOneByOrFail(
        WorkflowArea,
        { name: 'Área de Cuentas Individuales Fondo de Retiro' },
      );
      const qualificationArea = await manager.findOneByOrFail(WorkflowArea, {
        name: 'Área de Calificación Fondo de Retiro',
      });
      const chiefArea = await manager.findOneByOrFail(WorkflowArea, {
        name: 'Área de Jefatura Fondo de Retiro',
      });
      const liquidationArea = await manager.findOneByOrFail(WorkflowArea, {
        name: 'Área de Liquidación Fondo de Retiro',
      });
      const beDirectionArea = await manager.findOneByOrFail(WorkflowArea, {
        name: 'Dirección BE',
      });
      const daaDirectionArea = await manager.findOneByOrFail(WorkflowArea, {
        name: 'Dirección DAA',
      });

      const rfWorkflowSequences: Partial<WorkflowSequence>[] = [
        {
          workflow: RfWorkflow,
          fromWfArea: receptionArea,
          toWfArea: fileArea,
        },
        {
          workflow: RfWorkflow,
          fromWfArea: fileArea,
          toWfArea: legalReviewArea,
        },
        {
          workflow: RfWorkflow,
          fromWfArea: legalReviewArea,
          toWfArea: individualAccountsArea,
        },
        {
          workflow: RfWorkflow,
          fromWfArea: individualAccountsArea,
          toWfArea: qualificationArea,
        },
        {
          workflow: RfWorkflow,
          fromWfArea: qualificationArea,
          toWfArea: chiefArea,
        },
        {
          workflow: RfWorkflow,
          fromWfArea: chiefArea,
          toWfArea: liquidationArea,
        },
        {
          workflow: RfWorkflow,
          fromWfArea: liquidationArea,
          toWfArea: beDirectionArea,
        },
        {
          workflow: RfWorkflow,
          fromWfArea: beDirectionArea,
          toWfArea: daaDirectionArea,
        },
      ];

      const entitySequence = manager.getRepository(WorkflowSequence).create(rfWorkflowSequences);
      await manager.getRepository(WorkflowSequence).save(entitySequence);
    });
  }
}
