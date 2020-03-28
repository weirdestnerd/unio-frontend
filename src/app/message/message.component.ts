import {Component, Input, OnInit} from '@angular/core';
import {Chat} from '../../interfaces/Chat';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() chat: Chat;

  constructor() { }

  ngOnInit(): void {
  }

}
