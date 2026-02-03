import 'reflect-metadata';
import dataSource from '../configuration/data-source';
import UserSeeder from './user.seeder';
import DivingDataSeeder from './diving-data.seeder';
import DiveSeeder from './dive.seeder';

async function runSeed() {
  try {
    console.log('--- Starting Database Seeding ---');

    // Initialize DataSource
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    console.log('Database connection established');

    // Run Seeders
    console.log('Running UserSeeder...');
    const userSeeder = new UserSeeder();
    await userSeeder.run(dataSource);

    console.log('Running DivingDataSeeder...');
    const divingDataSeeder = new DivingDataSeeder();
    await divingDataSeeder.run(dataSource);

    console.log('Running DiveSeeder...');
    const diveSeeder = new DiveSeeder();
    await diveSeeder.run(dataSource);

    console.log('--- Seeding Completed Successfully ---');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

runSeed();
