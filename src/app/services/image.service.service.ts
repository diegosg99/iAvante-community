import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = 'http://10.111.249.116:3003/api'; // TODO IP : 10.111.249.108

  imageFile: { link: string; file: any; name: string;type: number; } | any;
  imageRaw: { link: string; file: any; name: string; } | any;

  constructor(private http: HttpClient) { }

  // imagePreview = (event,uid) => {

  //   if (event.target.files && event.target.files[0]) {
  //     this.imageRaw = event.target.files[0];

  //     const reader = new FileReader();

  //     reader.onload = (_event: any) => {
  //         this.imageFile = {
  //             link: _event.target.result,
  //             file: event.srcElement.files[0],
  //             user_id: uid,
  //             name: event.srcElement.files[0].name,
  //             type: 0,
  //             cat: 'profile'
  //         };
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }


  processImage = (fileRaw:any,uid:string,prefix='profile.') => {

    let imageBlob = fileRaw;
    let type = imageBlob.name.split('.')[1];
    let file:any = new FormData();    

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
