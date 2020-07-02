import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  roomUrl: string = '';

  ngOnInit() {
  }

  joinRoom(){
    let roomId = this.roomUrl.split("/").pop();
    if(roomId){
      this.router.navigate(['auth/join', roomId])
    }
  }

}
