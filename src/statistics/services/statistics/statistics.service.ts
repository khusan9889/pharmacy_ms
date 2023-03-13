import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from 'src/typeorm';



@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchasesRepository: Repository<Purchase>,
  ) {}

  async getUserPurchaseStats(): Promise<{ userId: number; numPurchases: number; totalPrice: number }[]> {
    const queryBuilder = this.purchasesRepository.createQueryBuilder('purchase');
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
}

