import { Test, TestingModule } from '@nestjs/testing';
import { ProductsPurchaseService } from './products_purchase.service';

describe('ProductsPurchaseService', () => {
  let service: ProductsPurchaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsPurchaseService],
    }).compile();

    service = module.get<ProductsPurchaseService>(ProductsPurchaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
