import { Injectable } from '@angular/core';
import {Chat} from '../interfaces/Chat';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {
  chats: Array<Chat>;
  // TODO: get username from Firebase
  username = 'default_username';
  baseApiUrl = `/api/${this.username}`;

  constructor(
    private http: HttpClient
  ) { }

  getChatHistory() {
    return this.http.get<Array<Chat>>(`${this.baseApiUrl}/chat_history`);
  }

  getBotResponseForMessage(message: string) {
    return this.http.get<string>(`${this.baseApiUrl}/bot_response`, {
      params: {message}
    });
    // return this.http.post<string>(`${this.baseApiUrl}/bot_response`, message);
  }
}
