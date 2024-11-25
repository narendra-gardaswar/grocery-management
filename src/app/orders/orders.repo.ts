import { Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_PROVIDER } from '@core/database';
import { orders } from './schema/orders.schema';
import { orderedProducts } from './schema/ordered-products.schema';
import { Product, products } from '@products/schema/products.schema';
import { and, eq, inArray } from 'drizzle-orm';
import { ProductEntity } from '@app/products/entities/products.entity';
import {
  SaveOrderInput,
  SaveOrderedProductInput,
} from './dto/create-order.dto';

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
    @Inject(DRIZZLE_PROVIDER)
    private productsDb: PostgresJsDatabase<{
      products: typeof products;
    }>,
  ) {}

  async getProductsByIds(productIds: string[]): Promise<ProductEntity[]> {
    return await this.productsDb
      .select()
      .from(products)
      .where(
        and(inArray(products.id, productIds), eq(products.isDeleted, false)),
      );
  }

  async saveOrder(orderInput: SaveOrderInput): Promise<void> {
    await this.ordersDb.insert(orders).values(orderInput).returning();
  }

  async saveOrderedProducts(
    orderedProductsData: SaveOrderedProductInput[],
  ): Promise<void> {
    await this.orderedProductsDb
      .insert(orderedProducts)
      .values(orderedProductsData);
  }

  async updateProduct(
    prouctId: string,
    updateProduct: Partial<Product>,
  ): Promise<ProductEntity | undefined> {
    const fieldsToUpdate = {
      ...updateProduct,
    };
    const [updatedProduct] = await this.productsDb
      .update(products)
      .set(fieldsToUpdate)
      .where(and(eq(products.id, prouctId), eq(products.isDeleted, false)))
      .returning();
    return updatedProduct;
  }
}
