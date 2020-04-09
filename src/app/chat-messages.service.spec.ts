import {ChatMessagesService} from './chat-messages.service';
import {asyncData} from '../testing/async-observable-helper';

describe('ChatMessagesService', () => {
  let chatMessagesService: ChatMessagesService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    chatMessagesService = new ChatMessagesService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(chatMessagesService).toBeTruthy();
  });

  it('should return chat history for default username', () => {
    const expectedChatHistory = [
        {timestamp: 123, isBotMessage: true, message: 'hi'},
        {timestamp: 123, isBotMessage: false, message: 'hello'}
      ];

    httpClientSpy.get.and.returnValue(asyncData(expectedChatHistory));

    chatMessagesService.getChatHistory().subscribe(
      chats => expect(chats).toEqual(expectedChatHistory, 'expected chat history')
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one GET call');
  });

  it('should return bot response when default username sends message', () => {
    const expectedBotResponse = {response: 'hello there'};

    httpClientSpy.get.and.returnValue(asyncData(expectedBotResponse));

    chatMessagesService.getBotResponseForMessage(jasmine.any(String).jasmineToString()).subscribe(
      botResponse => expect(botResponse).toEqual(expectedBotResponse)
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one GET call');
  });
});
