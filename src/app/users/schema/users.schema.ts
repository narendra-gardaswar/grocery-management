import { TableName } from '@core/constants';
import { boolean, pgTable, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const UserRole = pgEnum('role', ['USER', 'ADMIN']);

export const users = pgTable(TableName.USERS, {
  id: text('id').primaryKey().notNull().unique(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  fullName: text('full_name'),
  role: UserRole('role').notNull(),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .notNull(),
});
