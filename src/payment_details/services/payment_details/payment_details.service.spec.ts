import { Test, TestingModule } from '@nestjs/testing';
import { PaymentDetailsService } from './payment_details.service';

describe('PaymentDetailsService', () => {
  let service: PaymentDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentDetailsService],
    }).compile();

    service = module.get<PaymentDetailsService>(PaymentDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
