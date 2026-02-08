import { DataSource } from 'typeorm';
import { DivingEnvironment } from '@/domain/dives/entities/diving-environment.entity';
import { DivingType } from '@/domain/dives/entities/diving-type.entity';

export default class DivingDataSeeder {
  public async run(dataSource: DataSource): Promise<any> {
    const environmentRepository = dataSource.getRepository(DivingEnvironment);
    const typeRepository = dataSource.getRepository(DivingType);

    // Seed Environments
    const environments = [
      { label: 'Sea', token: 'sea' },
      { label: 'Lake', token: 'lake' },
      { label: 'River', token: 'river' },
      { label: 'Pool', token: 'pool' },
      { label: 'Cenote', token: 'cenote' },
      { label: 'Quarry', token: 'quarry' },
    ];

    for (const env of environments) {
      const exists = await environmentRepository.findOneBy({
        token: env.token,
      });
      if (!exists) {
        await environmentRepository.insert(env);
      }
    }

    // Seed Types
    const types = [
      { label: 'Discovery', token: 'discovery' },
      { label: 'Training', token: 'training' },
      { label: 'Recreational', token: 'recreational' },
      { label: 'Technical', token: 'technical' },
      { label: 'Cave', token: 'cave' },
      { label: 'Wreck', token: 'wreck' },
      { label: 'Night', token: 'night' },
      { label: 'Deep', token: 'deep' },
      { label: 'Drift', token: 'drift' },
      { label: 'Ice', token: 'ice' },
      { label: 'Photography', token: 'photography' },
    ];

    for (const type of types) {
      const exists = await typeRepository.findOneBy({ token: type.token });
      if (!exists) {
        await typeRepository.insert(type);
      }
    }
  }
}
