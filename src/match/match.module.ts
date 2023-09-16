import { Module } from '@nestjs/common';
import { MatchGateway } from './match.gateway';
import { UserService } from '../user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [MatchGateway, UserService],
})
export class MatchModule {}
