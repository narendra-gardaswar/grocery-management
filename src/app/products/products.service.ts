import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepo } from './products.repo';
import {
  AddProductBody,
  AddProductResponse,
  SaveProductInput,
} from './dto/add-product.dto';
import { ulid } from 'ulid';
import { GetProductResponse } from './dto/get-product.dto';
import {
  GetProductsListQuery,
  GetProductsListResponse,
} from './dto/get-products-list.dto';
import {
  UpdateProductBody,
  UpdateProductResponse,
} from './dto/update-product.dto';
import { DeleteProductResponse } from './dto/delete-product.dto';
import {
  GetUserProductsListQuery,
  GetUserProductsListResponse,
} from './dto/get-user-products-list.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo: ProductsRepo) {}

  async addProduct(body: AddProductBody): Promise<AddProductResponse> {
    const productInput: SaveProductInput = {
      id: ulid(),
      ...body,
    };
    await this.productsRepo.addProduct(productInput);

    return {
      message: 'Product added successfully',
    };
  }

  async getProduct(id: string): Promise<GetProductResponse> {
    const product = await this.productsRepo.getProductById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      product,
    };
  }

  async getProductsList(
    query: GetProductsListQuery,
  ): Promise<GetProductsListResponse> {
    const { limit, page, search } = query;
    const { productsList, total } = await this.productsRepo.getProductsList(
      limit,
      page,
      search,
    );

    const totalPages = Math.ceil(total / limit);

    return {
      products: productsList,
      totalPages,
      totalCount: total,
      limit,
      page,
    };
  }

  async updateProduct(
    id: string,
    body: UpdateProductBody,
  ): Promise<UpdateProductResponse> {
    const product = await this.productsRepo.updateProduct(id, body);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return {
      message: 'Product updated successfully',
    };
  }

  async deleteProduct(id: string): Promise<DeleteProductResponse> {
    const product = await this.productsRepo.updateProduct(id, {
      isDeleted: true,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return {
      message: 'Product Deleted successfully',
    };
  }

  async getUserProductsList(
    query: GetUserProductsListQuery,
  ): Promise<GetUserProductsListResponse> {
    const { search, limit, page } = query;
    const { productsList, total } = await this.productsRepo.getProductsList(
      limit,
      page,
      search,
    );
    const hasMore = page * limit < total;

    return {
      products: productsList,
      hasMore,
      totalCount: total,
    };
  }
}
