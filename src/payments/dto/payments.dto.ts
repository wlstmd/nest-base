import { IsNotEmpty } from 'class-validator';

export class TossPaymentDTO {
  @IsNotEmpty()
  paymentKey: string;

  @IsNotEmpty()
  orderId: string;

  @IsNotEmpty()
  amount: number;
}
