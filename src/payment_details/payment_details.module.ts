import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment/payment.controller';
import { PaymentDetailsController } from './controllers/payment_details/payment_details.controller';
import { PaymentDetailsService } from './services/payment_details/payment_details.service';

@Module({
  controllers: [PaymentController, PaymentDetailsController],
  providers: [PaymentDetailsService]
})
export class PaymentDetailsModule {}
