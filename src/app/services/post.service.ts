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

    console.log(id);

    const db = getDatabase();
    const postRef = dbRef(db, 'posts/' + id);
    onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      //updateStarCount(postElement, data);
    });


    const postsRef = dbRef(db, 'posts/' + id);

    // Create a query against the collection.
    const q = query('posts', where("id", "==", id));


    return this.firebase.collection('posts').where('__name__', '==' ,'fK3ddutEpD2qQqRMXNW5').get();
  }
}

