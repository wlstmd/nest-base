import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from '../schema/comment.shema';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiSecurity('basic')
@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '댓글 등록' })
  @Post('view')
  async createComment(@Body('content') content: string): Promise<Comment> {
    return await this.commentsService.createComment(content);
  }

  @ApiOperation({ summary: '댓글 보기' })
  @Get('views')
  async getAllComments(): Promise<Comment[]> {
    return await this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: '게시물 등록' })
  @Post('post')
  async createPost(
    @Body('title') title: string,
    @Body('content') content: string,
  ): Promise<Comment> {
    return await this.commentsService.createPost(title, content);
  }

  @ApiOperation({ summary: '모든 게시물 보기' })
  @Get('posts')
  async getAllPosts(): Promise<Comment[]> {
    return await this.commentsService.getAllPosts();
  }
}
