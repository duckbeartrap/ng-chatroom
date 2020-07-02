import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { JoinComponent } from './join/join.component';
import { ChatService } from '@services/chat/chat.service';


@NgModule({
  declarations: [JoinComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ChatService
  ]
})
export class AuthModule { }
