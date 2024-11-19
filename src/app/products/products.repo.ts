import { Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_PROVIDER } from '@core/database';
import { products } from './schema/products.schema';

export class ProductsRepo {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private db: PostgresJsDatabase<{
      products: typeof products;
    }>,
  ) {}
}
