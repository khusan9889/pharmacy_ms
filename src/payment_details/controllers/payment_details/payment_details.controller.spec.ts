import { Test, TestingModule } from '@nestjs/testing';
import { PaymentDetailsController } from './payment_details.controller';

describe('PaymentDetailsController', () => {
  let controller: PaymentDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentDetailsController],
    }).compile();

    controller = module.get<PaymentDetailsController>(PaymentDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
