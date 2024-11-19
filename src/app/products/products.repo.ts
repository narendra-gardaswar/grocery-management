import { Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_PROVIDER } from '@core/database';
import { products } from './schema/products.schema';
import { SaveProductInput } from './dto/add-product.dto';
import { ProductEntity } from './entities/products.entity';
import { eq, and, count, ilike, asc } from 'drizzle-orm';

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

  async getProductById(id: string): Promise<ProductEntity | null> {
    const [product] = await this.db
      .select()
      .from(products)
      .where(and(eq(products.id, id), eq(products.isDeleted, false)));
    return product;
  }

  async getProductsList(
    limit: number,
    page: number,
    search?: string,
  ): Promise<{ productsList: ProductEntity[]; total: number }> {
    const offset = (page - 1) * limit;

    const baseWhereClause = eq(products.isDeleted, false);

    const whereClause = search
      ? and(baseWhereClause, ilike(products.name, `%${search}%`))
      : baseWhereClause;

    const [productsList, [{ total }]] = await Promise.all([
      this.db
        .select()
        .from(products)
        .where(whereClause)
        .orderBy(asc(products.name))
        .limit(limit)
        .offset(offset),
      this.db.select({ total: count() }).from(products).where(whereClause),
    ]);

    return {
      productsList,
      total,
    };
  }
}
