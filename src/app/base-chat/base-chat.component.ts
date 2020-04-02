import {Component, OnInit} from '@angular/core';
import {Chat} from '../../interfaces/Chat';
import {ChatMessagesService} from '../chat-messages.service';

@Component({
  selector: 'app-base-chat',
  templateUrl: './base-chat.component.html',
  styleUrls: ['./base-chat.component.css']
})
export class BaseChatComponent implements OnInit {
  name: string;
  chats: Array<Chat>;
  messageInput = '';

  constructor(
    private chatMessagesService: ChatMessagesService
  ) { }

  ngOnInit(): void {
    this.chatMessagesService.getChatHistory()
      .subscribe(
        chats => this.chats = chats,
        error => {
          console.error(error);
          this.chats = [];
        }
      );
  }

  sendMessage(): void {
    this.addUserMessageToChats(this.messageInput);
    this.messageInput = '';

    this.chatMessagesService.getBotResponseForMessage(this.messageInput)
      .subscribe((botResponse) => {
        // @ts-ignore
        const response = (botResponse as object).response;
        this.addBotMessageToChats(response);
      });
  }

  addUserMessageToChats(message: string) {
    const newUserMessage = {
      message,
      timestamp: Date.now(),
      isBotMessage: false
    } as Chat;
    this.chats.push(newUserMessage);
  }

  addBotMessageToChats(message: string) {
    const newBotResponse = {
      message,
      isBotMessage: true
    } as Chat;
    this.chats.push(newBotResponse);
  }

}
