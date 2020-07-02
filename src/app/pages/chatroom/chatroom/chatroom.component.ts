import { Component, OnInit } from '@angular/core';
import { IMessage, ITyping } from '@interfaces';
import { ChatService } from '@services/chat/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  messageInput: string = '';
  messages: IMessage[] = [];
  participants: string[];
  typing = null;
  room: string;
  senderEmail: string;
  senderUsername: string;
  connection;

  constructor(private chatService: ChatService, private activatedRoute: ActivatedRoute,) {
    this.senderEmail = localStorage.getItem('senderEmail');
    this.senderUsername = localStorage.getItem('senderUsername');
    this.activatedRoute.params.subscribe( params => {
      if(params['chatroom']){
        this.room = params['chatroom'];
      }
    });

  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe((message: IMessage) => this.messages.push(message));
    this.chatService.getParticipants().subscribe((participants: string[]) => this.participants = participants);
    this.chatService.getTyping().subscribe((typing: IMessage) => {
      console.log(typing);
      this.typing = typing;
      setTimeout(()=>this.typing = null, 2000);
    });
  }

  sendMessage(){
    this.chatService.sendMessage(this.room, this.messageInput, this.senderEmail);
    this.messageInput = '';
  }

  sendTyping(){
    console.log("typing")
    this.chatService.type(this.room, this.messageInput, this.senderEmail);
  }

}
