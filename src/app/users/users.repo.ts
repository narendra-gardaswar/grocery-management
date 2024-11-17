import { Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_PROVIDER } from '@core/database';
import { users } from './schema/users.schema';
import { SaveUserInput } from './dto/register-user.dto';
import { UserEntity } from './entities/users.entity';

export class UsersRepo {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private db: PostgresJsDatabase<{
      users: typeof users;
    }>,
  ) {}

  async createUser(input: SaveUserInput): Promise<UserEntity> {
    const [user] = await this.db.insert(users).values(input).returning();
    return user;
  }
}
