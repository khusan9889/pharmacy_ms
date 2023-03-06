import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductPurchase, Purchase } from 'src/typeorm';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchasesRepository: Repository<Purchase>,
  ) {}

  async findFilteredPurchases(dateFrom: string, dateTo: string): Promise<Purchase[]> {
    let query = this.purchasesRepository.createQueryBuilder('purchase');
    
    if (dateFrom) {
      query = query.andWhere('purchase.created >= :dateFrom', { dateFrom });
    }
    
    if (dateTo) {
      query = query.andWhere('purchase.created <= :dateTo', { dateTo });
    }
    
    query = query.leftJoinAndSelect('purchase.productPurchase', 'productPurchase')
      .leftJoinAndSelect('productPurchase.product', 'product')
      .select(['purchase', 'product.id', 'product.name', 'product.barcode', 'product.price' ,'productPurchase.amount']);
    
    return query.getMany();
  }
}
