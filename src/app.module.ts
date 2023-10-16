import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchModule } from './match/match.module';
import { SignModule } from './sign/sign.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { CommentsModule } from './comments/comments.module';
import { MatchGateway } from './match/match.gateway';
import { PaymentsModule } from './payments/payments.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-base'),
    SignModule,
    MatchModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'JWTSecretKey',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    CommentsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, MatchGateway, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
