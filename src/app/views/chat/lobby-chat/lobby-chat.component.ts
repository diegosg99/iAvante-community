import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-lobby-chat',
  templateUrl: './lobby-chat.component.html',
  styleUrls: ['./lobby-chat.component.scss']
})
export class LobbyChatComponent implements OnInit{

  userLogged:any;
  $messages:Observable<any>;
  @Input() lobby;


  constructor(private chatService: ChatService){}

  ngOnInit(): void {
    this.$messages = this.chatService.getLobbyData(this.lobby.uid);
  }
}
