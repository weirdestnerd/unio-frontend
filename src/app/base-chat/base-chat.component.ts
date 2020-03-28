import {Component, OnInit} from '@angular/core';
import {Chat} from '../../interfaces/Chat';

@Component({
  selector: 'app-base-chat',
  templateUrl: './base-chat.component.html',
  styleUrls: ['./base-chat.component.css']
})
export class BaseChatComponent implements OnInit {
  name: string;
  chats: Array<Chat>;

  constructor() { }

  ngOnInit(): void {
  }

}
