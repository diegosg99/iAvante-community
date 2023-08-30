import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { OauthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  userId;

  constructor(private firebase: AngularFirestore,private auth:OauthService) { }

  ngOnInit(): void {}

  getUserFollows = (userId) => {
    return this.firebase.collection("follow",ref=>ref.where('follower','==',userId)).snapshotChanges();
  }

  getUserFollowers = (userId) => {
    return this.firebase.collection("follow",ref=>ref.where('userId','==',userId)).snapshotChanges();
  }

  followUser = (followed,follower) => {
    const FOLLOW = {
      userId: followed,
      follower: follower,
      both: followed+'&union&'+follower
    }

    this.firebase.collection("follow").add({...FOLLOW});

    return true;
  }

  unfollowUser = (followed,follower) => {

    let docId;

    return this.firebase.collection("follow",ref=>ref.where('both','==',followed+'&union&'+follower)).snapshotChanges().subscribe((user:any)=> {
      docId = user[0].payload.doc._delegate._key.path.segments[user[0].payload.doc._delegate._key.path.segments.length -1];
    
      this.firebase.collection("follow").doc(docId).delete().then(()=>{
        console.log('Dejaste de seguir a '+followed);
      });
    });
  }

  checkFollow = (followed,follower) => {
    return this.firebase.collection("follow",ref=>ref.where('both','==',followed+'&union&'+follower)).snapshotChanges();
  }
  
  // getFollowers = () => {
  //   return this.firebase.collection('follow',ref => ref.where('categoria','==',category)).snapshotChanges();
  // }
  // getFollowed = () => {

  // }

  // processFollows = (user) => {
  //   return {docId:user.payload.doc._delegate._key.path.segments[user.payload.doc._delegate._key.path.segments.length -1],...user.payload.doc.data()};
  // }
}
