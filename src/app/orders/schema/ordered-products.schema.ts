import { TableName } from '@core/constants';
import {
  pgTable,
  text,
  timestamp,
  decimal,
  integer,
} from 'drizzle-orm/pg-core';
import { orders } from './orders.schema';
import { products } from '@app/products/schema/products.schema';

export const orderedProducts = pgTable(TableName.ORDERED_PRODUCTS, {
  id: text('id').primaryKey().notNull().unique(),
  orderId: text('order_id')
    .references(() => orders.id)
    .notNull(),
  productId: text('product_id')
    .references(() => products.id)
    .notNull(),
  quantity: integer('quantity').notNull(),
  pricePerUnit: decimal('price_per_unit').notNull(),
  totalPrice: decimal('total_price').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .notNull(),
});

export type OrderedProduct = typeof orders.$inferSelect;
