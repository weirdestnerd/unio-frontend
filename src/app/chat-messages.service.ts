import { Injectable } from '@angular/core';
import {Chat} from '../interfaces/Chat';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {BotResponse} from '../interfaces/BotResponse';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {
  username = 'default_username';
  baseApiUrl = `/api/${this.username}`;

  constructor(
    private http: HttpClient
  ) { }

  getChatHistory() {
    return this.http.get<Array<Chat>>(`${this.baseApiUrl}/chat_history`);
  }

  getBotResponseForMessage(message: string): Observable<BotResponse> {
    return this.http.get<BotResponse>(`${this.baseApiUrl}/bot_response`, {
      params: {message}
    });
  }
}
