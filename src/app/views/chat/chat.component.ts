import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { LockService } from 'src/app/services/lock.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  mensaje:string = "";
  mensajes:any = [];

  mostrar:boolean = false;

  //$userLogged:Observable<any> = this.lockService.checkToken();
  @Input() userLogged:any;
  @Input() $lobbys:Observable<any>;


  constructor(private lockService: LockService, private chatService: ChatService){}

  ngOnInit = () => {      
  }

  enviarMensaje = () => {

    let mensajeNuevo = {
      emisor:this.userLogged.uid,
      texto:this.mensaje
    }

    this.mensajes = [...this.mensajes,mensajeNuevo];

    this.mensaje = "";

    setTimeout(()=> {
      this.scrollToTheLastMesagge();
    },20)
  }

  mostrarChat = () => {
    if (this.userLogged === null || this.userLogged === undefined) {
      
      this.lockService.checkToken().subscribe(usuario => {
                this.userLogged = usuario;
      });
    }

    if (this.mostrar === false) {
      this.mostrar = true;
    }else{
      this.mostrar = false;
    }
  }

  scrollToTheLastMesagge = () => {
    let mensajes = document.getElementsByClassName('msj');

    let ultimo: any = mensajes[(mensajes.length -1)];
    let toppos = ultimo.offsetTop;

    let mensajesChat:any = document.getElementById('mensajesChat');

    mensajesChat.scrollTop = toppos;
  }
}
