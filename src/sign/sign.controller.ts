import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { UserDto } from '../sign/dto/user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { SignService } from './sign.service';
import { JwtAuthGuard } from '../guard/auth.guard';

@ApiBearerAuth()
@ApiSecurity('basic')
@ApiTags('Sign')
@Controller('sign')
export class SignController {
  constructor(private readonly signService: SignService) {}

  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @ApiResponse({
    status: 401,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '회원가입' })
  @Post('up')
  signUp(@Body() body: UserDto) {
    return this.signService.sign_up(body);
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @ApiResponse({
    status: 401,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '로그인' })
  @Post('in')
  signIn(@Body() body: UserDto) {
    return this.signService.sign_in(body);
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @ApiResponse({
    status: 401,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '로그아웃' })
  @Delete('out')
  @UseGuards(JwtAuthGuard)
  signOut(@Body() body: UserDto) {
    return this.signService.sign_out(body);
  }
}
