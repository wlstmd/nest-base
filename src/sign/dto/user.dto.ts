import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    required: true,
    example: '홍길동',
    description: '아이디',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    required: true,
    example: 'asdf@gmail.com',
    description: '이메일',
  })
  @IsString()
  readonly email: string;

  @ApiProperty({
    required: true,
    example: 'qwer1234!',
    description: '비밀번호',
  })
  @IsString()
  readonly password: string;
}
