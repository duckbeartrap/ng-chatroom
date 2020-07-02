import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateChatroomComponent } from './create-chatroom/create-chatroom.component';
import { ChatroomComponent } from './chatroom/chatroom.component';


const routes: Routes = [
  { path: "create", component: CreateChatroomComponent },
  { path: ":chatroom", component: ChatroomComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatroomRoutingModule { }
