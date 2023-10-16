import { Injectable } from '@nestjs/common';
import { TossPaymentDTO } from './dto/payments.dto';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  private readonly tossUrl = 'https://api.tosspayments.com/v1/payments';
  private readonly secretKey = 'testKey';

  async tossPayment(tossPaymentDTO: TossPaymentDTO) {
    const { orderId, amount, paymentKey } = tossPaymentDTO;
    let result;

    try {
      const response = await axios.post(
        `${this.tossUrl}/${paymentKey}`,
        {
          orderId,
          amount,
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${this.secretKey}:`).toString(
              'base64',
            )}`,
            'Content-Type': 'application/json',
          },
        },
      );
      result = {
        title: '결제 성공',
        body: response.data,
      };
    } catch (e) {
      console.log('토스 페이먼츠 에러 코드', e);
      result = {
        title: '결제 실패',
        body: e.message,
      };
    }
    return result;
  }
}
