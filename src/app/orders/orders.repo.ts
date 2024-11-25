import { Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_PROVIDER } from '@core/database';
import { orders } from './schema/orders.schema';
import { orderedProducts } from './schema/ordered-products.schema';

export class OrdersRepo {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private ordersDb: PostgresJsDatabase<{
      orders: typeof orders;
    }>,
    @Inject(DRIZZLE_PROVIDER)
    private orderedProductsDb: PostgresJsDatabase<{
      orderedProducts: typeof orderedProducts;
    }>,
  ) {}
}
