import { Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_PROVIDER } from '@core/database';
import { users } from './schema/users.schema';
import { SaveUserInput } from './dto/register-user.dto';
import { UserEntity, UserRole } from './entities/users.entity';
import { eq, and } from 'drizzle-orm';

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

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return user;
  }

  async getUserByEmailAndRole(
    email: string,
    role: UserRole,
  ): Promise<UserEntity | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(
        and(
          eq(users.email, email),
          eq(users.role, role),
          eq(users.isDeleted, false),
        ),
      );
    return user;
  }
}
