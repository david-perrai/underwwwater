import { DataSource } from 'typeorm';
import { User } from '../domain/users/entities/user.entity';
import { faker } from '@faker-js/faker';

export default class UserSeeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);

    // Create Admin User
    const adminExists = await repository.findOneBy({
      email: 'admin@undewwwater.com',
    });
    if (!adminExists) {
      const admin = repository.create({
        email: 'admin@undewwwater.com',
        username: 'admin',
        password: 'password123',
        roles: ['ROLE_USER', 'ROLE_ADMIN'],
        activatedAt: new Date(),
      });
      await repository.save(admin);
    }

    // Create Test User
    const testUserExists = await repository.findOneBy({
      email: 'user@undewwwater.com',
    });
    if (!testUserExists) {
      const testUser = repository.create({
        email: 'user@undewwwater.com',
        username: 'testuser',
        password: 'password123',
        roles: ['ROLE_USER'],
        activatedAt: new Date(),
      });
      await repository.save(testUser);
    }

    // Create some random users
    for (let i = 0; i < 5; i++) {
      const email = faker.internet.email();
      const exists = await repository.findOneBy({ email });
      if (!exists) {
        const user = repository.create({
          email,
          username: faker.internet.username(),
          password: 'password123',
          roles: ['ROLE_USER'],
          avatar: faker.image.avatar(),
          activatedAt: faker.date.past(),
        });
        await repository.save(user);
      }
    }
  }
}
