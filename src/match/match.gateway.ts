import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';

@WebSocketGateway()
export class MatchGateway {
  constructor(private readonly userService: UserService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('match')
  async handleMatchEvent(client: Socket, data: any): Promise<void> {
    console.log(data);
    // 여기에서 매칭 로직을 구현하고 매칭된 사용자를 클라이언트에게 보냅니다.
    const randomUser = await this.userService.findRandomUser();
    if (randomUser) {
      client.emit('matched', randomUser);
    }
  }

  @SubscribeMessage('chat')
  handleChatEvent(client: Socket, data: any): void {
    // 채팅 메시지를 다른 사용자에게 브로드캐스트합니다.
    client.broadcast.emit('chat', data);
  }
}
