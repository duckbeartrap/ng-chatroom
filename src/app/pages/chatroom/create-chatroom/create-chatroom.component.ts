import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: 'app-create-chatroom',
  templateUrl: './create-chatroom.component.html',
  styleUrls: ['./create-chatroom.component.scss']
})
export class CreateChatroomComponent implements OnInit {

  chatroomForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.createChatroomForm();
  }

  ngOnInit() {
  }

  createChatroomForm(){
    this.chatroomForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  onSubmit(){
    if(this.chatroomForm.valid){
      this.router.navigate(["auth/join", this.chatroomForm.value.name]);
    }else{
      alert("Please fill in the form correctly")
    }
  }

}
