import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { IProduct } from "src/common/interfaces/product.interface";
import { Product } from "./entities/product.entity";
import { createCustomException } from "src/utils/exceptionsGenerator";
import { IResponse } from "src/common/interfaces/response.interface.ts";
import { PaginationQueryDto } from "./dto/pagination-query.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<IProduct> {
    const product = await this.productRepository.save(createProductDto);
    return product;
  }

  async findAll({
    limit,
    page,
    name,
  }: PaginationQueryDto): Promise<IProduct[]> {
    const productsFound = await this.productRepository.find();
    if (!productsFound) {
      createCustomException("Products not found", 404, "Product");
    }

    if (!limit && !page && !name) return productsFound;

    const queryBuilder = this.productRepository.createQueryBuilder("product");
    if (name) {
      queryBuilder.andWhere("LOWER(product.name) LIKE :name", {
        name: `%${name.toLowerCase()}%`,
      });
      if (!limit && !page && name) return queryBuilder.getMany();
    }
    const offset = (page - 1) * limit;

    const products = await queryBuilder.take(limit).skip(offset).getMany();

    return products;
  }

  async findOne(id: string): Promise<IProduct> {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      createCustomException("Product not found", 404, "Product");
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    let product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product)
      throw createCustomException("Product not found", 404, "Poduct");
    await this.productRepository.update(id, updateProductDto);
    product = await this.productRepository.findOne({ where: { id } });
    return product;
  }

  async remove(id: string): Promise<IResponse> {
    let product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product)
      throw createCustomException("Product not found", 404, "Poduct");
    await this.productRepository.delete(id);

    return {
      message: "Se elimino el producto exitosamente",
      data: product,
      code: "OK_PRODUCT_DELETE",
    };
  }
}
