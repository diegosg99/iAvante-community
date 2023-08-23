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
    const FOLLOW = {
      userId: userId,
      follower: this.userId
    }

    return this.firebase.collection("follow",ref=>ref.where('userId','==',userId)).snapshotChanges();
  }

  followUser = (userId,userLogged) => {
    const FOLLOW = {
      userId: userId,
      follower: userLogged
    }

    let processedFollows = [];

    
    return processedFollows.find(data=>{
      data.follower === this.userId;
    })?this.unfollowUser(processedFollows[0].userId):this.firebase.collection("follow").add({...FOLLOW});
  }
  unfollowUser = (data) => {

    return this.firebase.collection("follow").doc(data.docId).delete();
  }

  // getFollowers = () => {
  //   return this.firebase.collection('follow',ref => ref.where('categoria','==',category)).snapshotChanges();
  // }
  // getFollowed = () => {

  // }

  processFollows = (user) => {
    return {docId:user.payload.doc._delegate._key.path.segments[user.payload.doc._delegate._key.path.segments.length -1],...user.payload.doc.data()};
  }

  checkFollow = (userId) => {
    let processedFollows;
    this.getUserFollows(userId).subscribe(userFollows => {

      userFollows.forEach(user => {
        processedFollows = [...processedFollows,this.processFollows(user)];
      });

      console.log(processedFollows);
    });
  }
}
