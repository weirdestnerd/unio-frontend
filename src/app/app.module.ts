import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


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
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
