//statistics.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from 'src/typeorm';
import { ProductPurchase } from 'src/typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchasesRepository: Repository<Purchase>,
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

  async getCommonProductsStats(): Promise<{ productId: number; count: number }[]> {
  const queryBuilder = this.productPurchaseRepository.createQueryBuilder('pp')
    .select('pp.product.id', 'productId')
    .addSelect('pp.product.name', 'productName')
    .addSelect('COUNT(pp.id)', 'numPurchases')
    .groupBy('pp.product.id')
    .orderBy('numPurchases', 'DESC')
    .limit(10);

  const results = await queryBuilder.getRawMany();

  return results.map(result => ({
    productId: result.productId,
    productName: result.productName,
    count: parseInt(result.numPurchases),
  }));
}
}

