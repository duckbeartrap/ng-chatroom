import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

import { ChatroomRoutingModule } from './chatroom-routing.module';
import { CreateChatroomComponent } from './create-chatroom/create-chatroom.component';
import { ChatroomComponent } from './chatroom/chatroom.component';


@NgModule({
  declarations: [CreateChatroomComponent, ChatroomComponent],
  imports: [
    CommonModule,
    ChatroomRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class ChatroomModule { }
