//statistics.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from 'src/typeorm';
import { ProductPurchase } from 'src/typeorm';
import { Product } from 'src/typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchasesRepository: Repository<Purchase>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductPurchase)
    private readonly productPurchaseRepository: Repository<ProductPurchase>,
  ) {}

 async getUserPurchaseStats(dateFrom?: string, dateTo?: string): Promise<{ userId: number; numPurchases: number; totalPrice: number }[]> {
  const queryBuilder = this.purchasesRepository.createQueryBuilder('purchase');

  if (dateFrom) {
    queryBuilder.andWhere('purchase.created >= :dateFrom', { dateFrom });
  }

  if (dateTo) {
    queryBuilder.andWhere('purchase.created <= :dateTo', { dateTo });
  }

  queryBuilder
    .select('purchase.userId', 'userId')
    .addSelect('COUNT(purchase.id)', 'numPurchases')
    .addSelect('SUM(purchase.total_price)', 'totalPrice')
    .groupBy('purchase.userId');

  const results = await queryBuilder.getRawMany();

  return results.map((result) => ({
    userId: result.userId,
    numPurchases: parseInt(result.numPurchases),
    totalPrice: parseFloat(result.totalPrice),
  }));
  }

  async getMostCommonProducts(order: 'ASC' | 'DESC' = 'DESC'): Promise<{ productId: number; productName: string; count: number }[]> {
    const queryBuilder = this.productPurchaseRepository.createQueryBuilder('product_purchase');
    queryBuilder
      .select('product_purchase.productId', 'productId')
      .addSelect('product.name', 'productName')
      .addSelect('COUNT(product_purchase.id)', 'count')
      .leftJoin('product_purchase.product', 'product')
      .groupBy('product_purchase.productId, product.name')
      .orderBy('count', order)
      .limit(10);
  
    const results = await queryBuilder.getRawMany();
  
    return results.map((result) => ({
      productId: result.productId,
      productName: result.productName,
      count: parseInt(result.count),
    }));
  }

}

