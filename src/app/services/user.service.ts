import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDownloadURL,getStorage,ref,uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { OauthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{
  
  private storage = getStorage();
  userLogged = this.auth.getUserLogged();
  userId;

  constructor(private firebase: AngularFirestore,private auth:OauthService) { }

  ngOnInit(): void {
    if(this.userLogged){
      this.userLogged.subscribe(user=>{this.userId = user});
    }
  }

  // uploadUser = (user:any,image:any): any => {

  //   let imagePath = 'images/userProfile/'+image.name;

  //   let imagesRef = ref(this.storage, imagePath);
  //   let imageRef = ref(this.storage,imagePath);

  //   return uploadBytes(imagesRef, image).then((snapshot) => {

  //     getDownloadURL(imageRef).then((downloadURL) => {

  //       user.photo = downloadURL;

  //       let fullUser:any = {...user};
  //       console.log(user);
  //       console.log(image);

  //       return this.firebase.collection('users').add(fullUser)
  //             .then(()=>{
  //               console.log('Usuario creado con éxito.')
  //             }, error => {
  //               console.log(error);
  //             });
  //       })
  //     })
  // }

  uploadUser = (user:any,image:any): any => {

    let imagePath = 'images/userProfile/'+image.name;

    let imagesRef = ref(this.storage, imagePath);
    let imageRef = ref(this.storage,imagePath);

    return uploadBytes(imagesRef, image).then(() => {
      getDownloadURL(imageRef).then((downloadURL) => {

        user.photo = downloadURL;

        let fullUser:any = {...user};
        console.log(fullUser);

        return this.firebase.collection('users').doc(fullUser.uid).set(fullUser)
              .then((res)=>{
                console.log('Usuario actulizado con éxito.')
              }, error => {
                console.log(error);
              });
        })
      })
  }

  getUser = (id = null):Observable<any> => {
    return this.firebase.collection('users').doc(id==null?this.userId:id).snapshotChanges();
  }

  getUsers = ():Observable<any> => {
    return this.firebase.collection('users').snapshotChanges();
  }

  getCategoryQuestions = (category):Observable<any> => {
    return this.firebase.collection('users',ref => ref.where('categoria','==',category)).snapshotChanges();
  }

  updateQuestionViews = (id,question) => {
    question.views++
    return this.firebase.collection("users").doc(id).set({...question});
  }

  getQuestion = (id:string):any => {
    return this.firebase.collection("forums").doc(id);
  }
}