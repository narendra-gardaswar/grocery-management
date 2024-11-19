import { TableName } from '@core/constants';
import {
  boolean,
  pgTable,
  text,
  timestamp,
  integer,
  decimal,
} from 'drizzle-orm/pg-core';

export const products = pgTable(TableName.PRODUCTS, {
  id: text('id').primaryKey().notNull().unique(),
  name: text('name').unique().notNull(),
  price: decimal('price').default('0').notNull(),
  stockQuantity: integer('stock_quantity').default(0).notNull(),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .notNull(),
});
