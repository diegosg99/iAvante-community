import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageFile: { link: string; file: any; name: string;type: number; } | any;
  imageRaw: { link: string; file: any; name: string; } | any;

  constructor() { }

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
    
    console.log(fileRaw);
    console.log(uid);

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
}
