import { ProcedureStatus } from 'src/inbox/entities/procedure-status.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class ProcedureStatusSeeder1767032301846 implements Seeder {
  track = true;

  private readonly procedureStatus: Partial<ProcedureStatus>[] = [
    {
      name: 'Recibido',
    },
    {
      name: 'Validado',
    },
    {
      name: 'Cancelado',
    },
    {
      name: 'Derivado',
    },
    {
      name: 'Devuelto',
    },
  ];
  public async run(dataSource: DataSource): Promise<any> {
    await dataSource.transaction(async (manager) => {
      for (const status of this.procedureStatus) {
        await manager.getRepository(ProcedureStatus).insert(status);
      }
    });
  }
}
