import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  mensaje:string = "";
  mensajes:any = [
    {
      emisor:'id',
      texto:"¡Bienvenido a nuestra plataforma!"
    },
    {
      emisor:'id',
      texto:"A traves de aquí puedes contactar con otros docentes o alumnos."
    },
    {
      emisor:'id',
      texto:"Tambien puedes hacer preguntas en nuestro foro, o estar informado de las últimas noticias relacionadas con el mundo médico."
    },
    {
      emisor:'id',
      texto:"¡Esperemos que sea útil! Estamos a tu disposición."
    },
    {
      emisor:'id',
      texto:"IAVANTE, Fundación progreso y salud."
    },
  ];

  mostrar:boolean = false;


  ngOnInit = () => {

  }

  enviarMensaje = () => {
    console.log(this.mensaje);
  }

  mostrarChat = () => {
    if (this.mostrar === false) {
      this.mostrar = true;
    }else{
      this.mostrar = false;
    }
    console.log(this.mostrar);
  }
}
