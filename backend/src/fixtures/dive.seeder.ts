import { DataSource } from 'typeorm';
import { Dive, DiverRole } from '../domain/dives/entities/dive.entity';
import { User } from '../domain/users/entities/user.entity';
import { DivingEnvironment } from '../domain/dives/entities/diving-environment.entity';
import { DivingType } from '../domain/dives/entities/diving-type.entity';
import { faker } from '@faker-js/faker';

export default class DiveSeeder {
  public async run(dataSource: DataSource): Promise<any> {
    const diveRepository = dataSource.getRepository(Dive);
    const userRepository = dataSource.getRepository(User);
    const envRepository = dataSource.getRepository(DivingEnvironment);
    const typeRepository = dataSource.getRepository(DivingType);

    const users = await userRepository.find();
    const environments = await envRepository.find();
    const types = await typeRepository.find();

    if (users.length === 0 || environments.length === 0 || types.length === 0) {
      console.log('Skipping DiveSeeder: missing prerequisite data');
      return;
    }

    for (const user of users) {
      // Create 3-8 dives per user
      const diveCount = faker.number.int({ min: 3, max: 8 });
      for (let i = 0; i < diveCount; i++) {
        const dive = diveRepository.create({
          date: faker.date.past(),
          totalTime: faker.number.int({ min: 20, max: 90 }),
          maxDepth: faker.number.float({ min: 2, max: 45, fractionDigits: 1 }),
          divingEnvironment: faker.helpers.arrayElement(environments),
          divingTypes: faker.helpers.arrayElements(types, { min: 1, max: 3 }),
          diverRole: faker.helpers.arrayElement(Object.values(DiverRole)),
          owner: user,
          // GasTanks and Gas are complex relations, keeping it simple for first version
          // but we could use factories for them.
          gasTanks: [
            {
              pressureStart: 200,
              pressureEnd: faker.number.int({ min: 30, max: 70 }),
              gases: [
                { type: 'oxygen' as any, percentage: 21 },
                { type: 'nitrogen' as any, percentage: 79 },
              ],
            },
          ] as any,
        });
        await diveRepository.save(dive);
      }
    }
  }
}
