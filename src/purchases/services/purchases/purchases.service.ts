import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductPurchase, Purchase } from 'src/typeorm';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchasesRepository: Repository<Purchase>,
  ) { }

  async findFilteredPurchases(dateFrom: string, dateTo: string, productId?: number, productName?: string): Promise<Purchase[]> {
    let query = this.purchasesRepository.createQueryBuilder('purchase');
    
    if (dateFrom) {
      query = query.andWhere('purchase.created >= :dateFrom', { dateFrom });
    }
  
    if (dateTo) {
      query = query.andWhere('purchase.created <= :dateTo', { dateTo });
    }
  
    if (productId && productName) {
      query = query.andWhere('(product.name ILIKE :productName OR pp.productId = :productId)', { 
        productName: `%${productName}%`, 
        productId 
      });
    } else if (productName) {
      query = query.andWhere('product.name ILIKE :productName', { productName: `%${productName}%` });
    } else if (productId) {
      query = query.andWhere('pp.productId = :productId', { productId });
    }
  
    query = query
      .leftJoinAndSelect('purchase.productPurchase', 'pp')
      .leftJoinAndSelect('pp.product', 'product')
      .select(['purchase', 'product.id', 'product.name', 'product.barcode', 'pp.price', 'pp.amount']);
  
    return query.getMany();
  }
  
}

