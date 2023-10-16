import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../schema/comment.shema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {}
  // 댓글 생성
  async createComment(content: string): Promise<Comment> {
    const newComment = new this.commentModel({ content });
    return await newComment.save();
  }

  async getAllComments(): Promise<Comment[]> {
    return await this.commentModel.find().exec();
  }

  // 게시물 생성
  async createPost(title: string, content: string): Promise<Comment> {
    const newPost = new this.commentModel({
      postTitle: title,
      postContent: content,
    });
    return await newPost.save();
  }

  async getAllPosts(): Promise<Comment[]> {
    return await this.commentModel
      .find({ postTitle: { $exists: true } })
      .exec();
  }
}
