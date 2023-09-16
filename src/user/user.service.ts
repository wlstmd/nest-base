import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findRandomUser(): Promise<User | null> {
    try {
      // MongoDB에서 모든 사용자를 가져옵니다.
      const allUsers = await this.userModel.find().exec();

      // 사용자가 없으면 null을 반환합니다.
      if (allUsers.length === 0) {
        return null;
      }

      // 랜덤한 인덱스를 생성합니다.
      const randomIndex = Math.floor(Math.random() * allUsers.length);

      // 랜덤한 사용자를 반환합니다.
      return allUsers[randomIndex];
    } catch (error) {
      throw new Error('랜덤 사용자 검색 중 오류가 발생했습니다.');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(_id: Types.ObjectId) {
    return this.userModel.findById(_id).exec();
  }
}
