import { Test, TestingModule } from '@nestjs/testing';
import { ProductsPurchaseController } from './products_purchase.controller';

describe('ProductsPurchaseController', () => {
  let controller: ProductsPurchaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsPurchaseController],
    }).compile();

    controller = module.get<ProductsPurchaseController>(ProductsPurchaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
