import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDownloadURL,getStorage,ref,uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private storage = getStorage();

  constructor(private firebase: AngularFirestore) { }

  uploadPost = (post: Post,image:any): Promise<any> => {

    let imagePath = 'images/'+image.name;

    let imagesRef = ref(this.storage, imagePath);
    let imageRef = ref(this.storage,imagePath);

    return uploadBytes(imagesRef, image).then((snapshot) => {

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

  getUserPosts = (userId):Observable<any> => {
    return this.firebase.collection("posts",ref=>ref.where('usuario','==',userId)).snapshotChanges();
  }

  getPost = (id:string):any => {

    let doc;
    
    this.firebase.collection('posts').snapshotChanges().subscribe(docs=>{
      doc = docs;
    });
  }
}

