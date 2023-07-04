import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage,getDownloadURL,getStorage,ref,uploadBytes, uploadString } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { Post } from '../models/Post';

import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private post = new Subject<any>();

  private storage = getStorage();

  private database = getDatabase();


  constructor(private firebase: AngularFirestore) { }

  uploadPost = (post: Post,image:any): Promise<any> => {

    let imagePath = 'images/'+image.name;

    let imagesRef = ref(this.storage, imagePath);
    let imageRef = ref(this.storage,imagePath);

    return uploadBytes(imagesRef, image).then((snapshot) => {
      console.log(snapshot);
      getDownloadURL(imageRef).then((downloadURL) => {

        post.photo = downloadURL;
        this.firebase.collection('posts').add(post)
          .then(()=>{
            console.log('Publicación subida con éxito.')
          }, error => {
            console.log(error);
          });
      });
    });
  }

  getPosts = ():Observable<any> => {
    return this.firebase.collection('posts',ref => ref.orderBy('fechaActualizacion','desc')).snapshotChanges();
  }

  getPost = (id:string):any => {

    let doc;
    
    this.firebase.collection('posts').snapshotChanges().subscribe(docs=>{
      doc = docs;
       console.log(doc);
    });

    


    // return this.firebase.collection('posts').where('__name__', '==' ,'6naHlNLYQUBUvlxrv99p').get();
  }
}

