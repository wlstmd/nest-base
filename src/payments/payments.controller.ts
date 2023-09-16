import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Response } from 'express';
import { TossPaymentDTO } from './dto/payments.dto';
import * as path from 'path';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiBearerAuth()
  @ApiSecurity('basic')
  @ApiOperation({ summary: '결제 성공' })
  @Get('/success')
  success(@Res() res: Response): void {
    res.sendFile(path.join(process.cwd(), 'src/public', 'success.html'));
  }
  @ApiOperation({ summary: '결제 페이지' })
  @Post('/toss')
  async tossPayment(
    @Body() tossPaymentDTO: TossPaymentDTO,
    @Res() res: Response,
  ) {
    const result = await this.paymentsService.tossPayment(tossPaymentDTO);
    console.log(result);

    if (result.title === '결제 성공') {
      res.redirect('/payments/success');
    } else {
      console.log('오류');
    }
  }
}
