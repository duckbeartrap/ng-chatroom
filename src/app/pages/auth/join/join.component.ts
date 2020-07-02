import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '@services/chat/chat.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  joinForm: FormGroup;
  chatroomName: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private chatService: ChatService) {
    this.createJoinForm();
    this.activatedRoute.params.subscribe( params => {
      if(params['chatroom']){
        this.chatroomName = params['chatroom'];
      }
    });

    this.chatService.joinedRoom().subscribe( res => {
      if(res){
        localStorage.setItem('senderEmail', this.joinForm.value.email);
        localStorage.setItem('senderUsername', this.joinForm.value.username);
        this.router.navigate(["chatroom", this.chatroomName]);
      }
    });
  }

  ngOnInit() {
  }

  createJoinForm(){
    this.joinForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required]]
    });
  }

  onSubmit(){
    if(this.joinForm.valid && this.chatroomName){
      const user = {
        username: this.joinForm.value.username,
        email: this.joinForm.value.email
      }
      this.chatService.joinRoom(this.chatroomName, user);
    }else{
      alert("Please fill in the form correctly")
    }
  }

}
