import { Component, OnInit } from '@angular/core';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  mensaje:string = "";
  mensajes:any = [
    {
      emisor:'b1oFK5kw76eylP3AlryuRKTC9Wa2',
      texto:"¡Bienvenido a nuestra plataforma!"
    },
    {
      emisor:'b1oFK5kw76eylP3AlryuRKTC9Wa2',
      texto:"A traves de aquí puedes contactar con otros docentes o alumnos."
    },
    {
      emisor:'b1oFK5kw76eylP3AlryuRKTC9Wa2',
      texto:"Tambien puedes hacer preguntas en nuestro foro, o estar informado de las últimas noticias relacionadas con el mundo médico."
    },
    {
      emisor:'HZvc0gbpm4cvUpSEg8uBcgkQ8QG3',
      texto:"Gracias mi broder a ver klk pasa."
    },
    {
      emisor:'HZvc0gbpm4cvUpSEg8uBcgkQ8QG3',
      texto:"Estoy buscando cobre pa pagarlo."
    },
    {
      emisor:'b1oFK5kw76eylP3AlryuRKTC9Wa2',
      texto:"¡Esperemos que sea útil! Estamos a tu disposición."
    },
    {
      emisor:'b1oFK5kw76eylP3AlryuRKTC9Wa2',
      texto:"IAVANTE, Fundación progreso y salud."
    },
  ];

  mostrar:boolean = false;

  usuarioLogueado:any;

  constructor(private auth:OauthService){}

  ngOnInit = async () => {
    // await this.auth.getUserLogged().subscribe(usuario => {
    //   let multifactor:any = usuario?.multiFactor
    //   this.usuarioLogueado = multifactor.user;
    // });
  }

  enviarMensaje = () => {

    let mensajeNuevo = {
      emisor:this.usuarioLogueado.uid,
      texto:this.mensaje
    }

    this.mensajes = [...this.mensajes,mensajeNuevo];

    this.mensaje = "";
  }

  mostrarChat = () => {
    if (this.usuarioLogueado === null || this.usuarioLogueado === undefined) {
      
      this.auth.getUserLogged().subscribe(usuario => {
        
        let multifactor:any = usuario?.multiFactor
        this.usuarioLogueado = multifactor.user;
      });
    }

    if (this.mostrar === false) {
      this.mostrar = true;
    }else{
      this.mostrar = false;
    }
  }
}
