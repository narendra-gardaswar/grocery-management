import { BadRequestException, Injectable } from '@nestjs/common';
import { OrdersRepo } from './orders.repo';
import {
  CreateOrderBody,
  CreateOrderResponse,
  OrderedProductDTO,
  SaveOrderInput,
  SaveOrderedProductInput,
  UpdateProductInput,
} from './dto/create-order.dto';
import { ulid } from 'ulid';
import { Product } from '@app/products/schema/products.schema';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepo: OrdersRepo) {}

  async createOrder(
    body: CreateOrderBody,
    userId: string,
  ): Promise<CreateOrderResponse> {
    const { orderedProducts } = body;

    const products = await this.validateAndFetchProducts(orderedProducts);

    const orderId = ulid();

    const { orderedProductsData, updateProduct } = this.processOrderedProducts(
      orderedProducts,
      products,
      orderId,
    );

    const orderTotalPrice = orderedProductsData
      .reduce((total, product) => total + Number(product.totalPrice), 0)
      .toFixed(2);

    const saveOrderInput: SaveOrderInput = {
      id: orderId,
      userId,
      totalPrice: orderTotalPrice,
    };

    await this.saveOrderWithProductsAndUpdateStock(
      saveOrderInput,
      orderedProductsData,
      updateProduct,
    );

    return {
      message: 'Order created successfully',
    };
  }

  private async validateAndFetchProducts(
    orderedProducts: OrderedProductDTO[],
  ): Promise<Product[]> {
    const productIds = [...new Set(orderedProducts.map((p) => p.productId))];
    const products = await this.ordersRepo.getProductsByIds(productIds);

    if (products.length !== productIds.length) {
      throw new BadRequestException('Invalid product id');
    }

    return products;
  }

  private processOrderedProducts(
    orderedProducts: OrderedProductDTO[],
    products: Product[],
    orderId: string,
  ): {
    orderedProductsData: SaveOrderedProductInput[];
    updateProduct: UpdateProductInput[];
  } {
    const orderedProductsData: SaveOrderedProductInput[] = [];
    const updateProduct: UpdateProductInput[] = [];

    for (const orderedProduct of orderedProducts) {
      const product = products.find(
        (product) => product.id === orderedProduct.productId,
      );

      if (!product) {
        throw new BadRequestException('Invalid product id');
      }

      if (product.stockQuantity < orderedProduct.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product: ${product.name}`,
        );
      }

      const totalPrice = Number(product.price) * orderedProduct.quantity;

      orderedProductsData.push({
        id: ulid(),
        orderId,
        productId: orderedProduct.productId,
        quantity: orderedProduct.quantity,
        pricePerUnit: product.price,
        totalPrice: totalPrice.toFixed(2),
      });

      updateProduct.push({
        productId: orderedProduct.productId,
        stockQuantity: product.stockQuantity - orderedProduct.quantity,
      });
    }

    return { orderedProductsData, updateProduct };
  }

  private async saveOrderWithProductsAndUpdateStock(
    saveOrderInput: SaveOrderInput,
    orderedProductsData: SaveOrderedProductInput[],
    updateProduct: UpdateProductInput[],
  ): Promise<void> {
    // TODO: Wrap in a database transaction
    await this.ordersRepo.saveOrder(saveOrderInput);
    await this.ordersRepo.saveOrderedProducts(orderedProductsData);

    const updatePromises = updateProduct.map((product) =>
      this.ordersRepo.updateProduct(product.productId, {
        stockQuantity: product.stockQuantity,
      }),
    );

    await Promise.all(updatePromises);
  }
}
