import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageComponent} from './message.component';
import {Chat} from '../../interfaces/Chat';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('MessageComponent', () => {
  let messageComponent: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let divDebugElement: DebugElement;
  let divElement: HTMLElement;
  const expectedChat = {
    timestamp: 123,
    isBotMessage: false,
    message: 'message'
  } as Chat;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MessageComponent);
        messageComponent = fixture.componentInstance;

        divDebugElement = fixture.debugElement.query(By.css('div'));
        divElement = divDebugElement.nativeElement;

        messageComponent.chat = expectedChat;

        fixture.detectChanges();
      });

  }));

  it('should create', () => {
    expect(messageComponent).toBeTruthy();
  });

  it('should render div tag with default classnames', () => {
    const expectedDefaultClassnames = 'app-message tile is-child notification';
    expect(divElement.className).toContain(expectedDefaultClassnames);
  });

  it('should render div tag with chat.message as text content', () => {
    const expectedMessage = expectedChat.message;
    expect(divElement.textContent).toEqual(expectedMessage);
  });

  describe('when chat is user message', () => {
    beforeEach(() => {
      expectedChat.isBotMessage = false;
      messageComponent.chat = expectedChat;
      fixture.detectChanges();
    });

    it('should render div tag with appropriate classnames for user message', () => {
      const expectedUserMessageClassnames = 'user-message has-background-grey-dark has-text-light';
      expect(divElement.className).toContain(expectedUserMessageClassnames);
    });
  });

  describe('when chat is bot message', () => {
    beforeEach(() => {
      expectedChat.isBotMessage = true;
      messageComponent.chat = expectedChat;
      fixture.detectChanges();
    });

    it('should render div tag with appropriate classnames for bot message', () => {
      const expectedBotMessageClassnames = 'bot-message has-background-light has-text-black';
      expect(divElement.className).toContain(expectedBotMessageClassnames);
    });
  });
});
