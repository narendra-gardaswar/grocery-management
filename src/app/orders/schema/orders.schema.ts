import { TableName } from '@core/constants';
import { users } from '@users/schema/users.schema';
import { pgTable, text, timestamp, decimal, pgEnum } from 'drizzle-orm/pg-core';

export const OrderStatus = pgEnum('status', [
  'PENDING',
  'CONFIRMED',
  'ON_THE_WAY',
  'DELIVERED',
  'CANCELLED',
]);

export const orders = pgTable(TableName.ORDERS, {
  id: text('id').primaryKey().notNull().unique(),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  totalPrice: decimal('total_price').notNull(),
  status: OrderStatus('status').default('CONFIRMED').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .notNull(),
});

export type Order = typeof orders.$inferSelect;
