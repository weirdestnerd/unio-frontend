import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseChatComponent} from './base-chat.component';
import {ChatMessagesService} from '../chat-messages.service';
import {Observable, of} from 'rxjs';
import {Chat} from '../../interfaces/Chat';
import {BotResponse} from '../../interfaces/BotResponse';
import {Component, DebugElement, Input} from '@angular/core';
import {BrowserModule, By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

const expectedChatHistory = [
  {timestamp: 123, isBotMessage: true, message: 'hi'},
  {timestamp: 123, isBotMessage: false, message: 'hello'}
] as Chat[];
const expectedBotResponse = {response: 'hello there'};

class MockChatMessageService {
  getChatHistory(): Observable<Array<Chat>> {
    return of(expectedChatHistory);
  }

  getBotResponseForMessage(): Observable<BotResponse> {
    return of(expectedBotResponse);
  }
}

@Component({selector: 'app-message', template: ''})
class MessageStubComponent {
  @Input() chat: Chat;
}

describe('BaseChatComponent', () => {
  let baseChatComponent: BaseChatComponent;
  let chatMessagesService: ChatMessagesService;
  let fixture: ComponentFixture<BaseChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, BrowserModule, CommonModule],
      declarations: [BaseChatComponent, MessageStubComponent],
      providers: [
        BaseChatComponent,
        {provide: ChatMessagesService, useClass: MockChatMessageService}
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BaseChatComponent);
        baseChatComponent = fixture.componentInstance;
        chatMessagesService = TestBed.inject(ChatMessagesService);
      });
  }));

  describe('default component variables', () => {
    it('should have default undefined for name', () => {
      expect(baseChatComponent.name).toBeUndefined();
    });

    it('should have default undefined for chats', () => {
      expect(baseChatComponent.chats).toBeUndefined();
    });

    it('should have default undefined for name', () => {
      expect(baseChatComponent.messageInput).toBe('');
    });
  });

  describe('when html template is rendered', () => {
    let rootDivDebugElement: DebugElement;
    let rootDivElement: HTMLElement;

    beforeEach(async(() => {
      rootDivDebugElement = fixture.debugElement.query(By.css('div.base-chat'));
      rootDivElement = rootDivDebugElement.nativeElement;
    }));

    it('should have default title as "Unio"', () => {
      const expectedTitle = 'Unio';
      fixture.detectChanges();
      const displayedTitle = rootDivElement.querySelector('div.identity > h1.title').textContent;
      expect(baseChatComponent.name).toBeUndefined();
      expect(displayedTitle).toEqual(expectedTitle);
    });

    it('should have title as set by name', () => {
      const expectedTitle = 'title';
      baseChatComponent.name = expectedTitle;
      fixture.detectChanges();
      const displayedTitle = rootDivElement.querySelector('div.identity > h1.title').textContent;
      expect(displayedTitle).toEqual(expectedTitle);
    });

    // TODO: for some reason, *ngFor doesn't update ui on fixture.detectChanges()
    // it('should render number of chats in chat_history', () => {
    //   expect(baseChatComponent.chats).toBeUndefined();
    //
    //   fixture.whenStable().then(() => {
    //     const displayedChats: NodeListOf<HTMLElement> = rootDivElement.querySelectorAll('div.chat-content div');
    //     fixture.detectChanges();
    //     expect(baseChatComponent.chats).toEqual(expectedChatHistory);
    //     expect(displayedChats.length).toEqual(expectedChatHistory.length);
    //   });
    // });

    it('should render empty input box initially with placeholder', () => {
      const inputBox = rootDivElement.querySelector('div.user-chat-input input');
      expect(inputBox.textContent).toEqual('');
      // @ts-ignore "Property 'placeholder' does not exist"
      expect(inputBox.placeholder).toEqual('Say something');
    });

    it('should capture text input', () => {
      const inputBox: HTMLInputElement = rootDivElement.querySelector('div.user-chat-input input');
      fixture.detectChanges();
      inputBox.value = 'new message';
      inputBox.dispatchEvent(new Event('input'));
      expect(baseChatComponent.messageInput).toEqual('new message');
    });

    it('should call sendMessage on keyup.enter or "send" button click', () => {
      const inputBox: HTMLInputElement = rootDivElement.querySelector('div.user-chat-input input');
      const sendButton: HTMLElement = rootDivElement.querySelector('div.user-chat-input button');
      const keyboardEvent = new KeyboardEvent('keyup', {
        key: 'enter'
      });

      spyOn(baseChatComponent, 'sendMessage');

      inputBox.dispatchEvent(keyboardEvent);
      sendButton.click();

      expect(baseChatComponent.sendMessage).toHaveBeenCalledTimes(2);
    });
  });

  it('should create', () => {
    expect(baseChatComponent).toBeTruthy();
  });

  it('should populate chats with chat history on Angular ngOnInit', () => {
    baseChatComponent.ngOnInit();
    expect(baseChatComponent.chats).toEqual(expectedChatHistory);
  });

  it('should send message to service and add bot response to chats', () => {
    baseChatComponent.ngOnInit();
    baseChatComponent.messageInput = 'new message';

    spyOn(baseChatComponent, 'addUserMessageToChats');
    spyOn(baseChatComponent, 'addBotMessageToChats');
    spyOn(chatMessagesService, 'getBotResponseForMessage')
      .and.returnValue(new MockChatMessageService().getBotResponseForMessage());

    baseChatComponent.sendMessage();

    expect(baseChatComponent.messageInput).toBe('');
    expect(baseChatComponent.addUserMessageToChats).toHaveBeenCalled();
    expect(baseChatComponent.addBotMessageToChats).toHaveBeenCalled();
    expect(chatMessagesService.getBotResponseForMessage).toHaveBeenCalled();
  });

  it('should add user message to chats', () => {
    baseChatComponent.ngOnInit();
    const newMessage = 'new message';
    const expectedChatsLength = expectedChatHistory.length + 1;

    baseChatComponent.addUserMessageToChats(newMessage);

    expect(baseChatComponent.chats.length).toEqual(expectedChatsLength);
  });

  it('should add bot message to chats', () => {
    baseChatComponent.ngOnInit();
    const newMessage = 'new message';
    const expectedChatsLength = expectedChatHistory.length + 1;

    baseChatComponent.addBotMessageToChats(newMessage);

    expect(baseChatComponent.chats.length).toEqual(expectedChatsLength);
  });
});
