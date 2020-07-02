import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject, Observable } from 'rxjs';
import { IMessage } from '@interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port : '');
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public init (){
    console.log("initializing")
  }

  public getId(){
    return this.socket.id;
  }

  public sendMessage(room, message, sender) {
    let payload: IMessage = {
      sender: sender,
      message: message,
      room: room
    };

    this.socket.emit('message', room, payload);
  }

  public type(room, message, sender) {
    let payload: IMessage = {
      sender: sender,
      message: message,
      room: room
    };

    this.socket.emit('typing', room, payload);
  }

  public joinRoom(room, user){
    this.socket.emit('join', room, user);
  }

  public joinedRoom() {
    console.log(this.socket)
    let observable = new Observable(observer => {
      this.socket.on('joined', (data) => {
        observer.next(data);    
      }); 
    });   
    return observable;
  }

  public getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('new-message', (data) => {
        observer.next(data);    
      }); 
    })  ;   
    return observable;
  }  

  public getParticipants() {
    let observable = new Observable(observer => {
      this.socket.on('participantsUpdate', (data) => {
        observer.next(data);    
      }); 
    })  ;   
    return observable;
  }  

  public getTyping() {
    let observable = new Observable(observer => {
      this.socket.on('typed', (data) => {
        data.pupu = this.socket.email;
        observer.next(data);    
      }); 
    })  ;   
    return observable;
  } 

}
