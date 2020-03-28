import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BaseChatComponent} from './base-chat/base-chat.component';
import {MessageComponent} from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseChatComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
