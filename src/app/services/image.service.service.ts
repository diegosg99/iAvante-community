import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = 'http://localhost:3003/api'; // TODO IP : 10.111.249.108

  imageFile: { link: string; file: any; name: string;type: number; } | any;
  imageRaw: { link: string; file: any; name: string; } | any;

  constructor(private http: HttpClient) { }

  processImage = (fileRaw:any,uid:string,prefix='profile.') => {

    let imageBlob = fileRaw;
    let type = imageBlob.name.split('.')[1];
    let file:any = new FormData();    

    console.log('NOMBRE FICHERO:')
    console.log(prefix+uid+'.'+type);
    console.log(prefix);
    console.log(uid);
    console.log(type);
    

    file.set('file',imageBlob,prefix+uid+'.'+type);
    
    return file;
  }

  getBase64 = (file) => {

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
    
      reader.onabort = reject;
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
     });
  }

  getProfilePic = (uid) => {
    return this.http.post(`${this.baseUrl}/get/media/profile`, {uid:uid});
  }

  getMediaPost = (id) => {
    console.log(id);
    return this.http.post(`${this.baseUrl}/get/media/post`, {id:id});
  }
}
