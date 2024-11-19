import { Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_PROVIDER } from '@core/database';
import { products } from './schema/products.schema';
import { SaveProductInput } from './dto/add-product.dto';
import { ProductEntity } from './entities/products.entity';

export class ProductsRepo {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private db: PostgresJsDatabase<{
      products: typeof products;
    }>,
  ) {}

  async addProduct(input: SaveProductInput): Promise<ProductEntity> {
    const [product] = await this.db.insert(products).values(input).returning();
    return product;
  }
}
