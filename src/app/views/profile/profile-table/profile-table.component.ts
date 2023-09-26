import { Component, Input } from '@angular/core';
import { FollowService } from 'src/app/services/follow.service';
import { ForumService } from 'src/app/services/forum.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.scss']
})
export class ProfileTableComponent {

  @Input() userLogged:any;
  userId;
  user;
  payload;
  p;

  factory;
  category;

  constructor(private _postService: PostService, private forumService: ForumService, private followService: FollowService){}

  payloadFactory = (category) => {
    this.payload = [];
    this.category = category;
    this.factory[category]();
  }

  getUserPosts = () => {
    this.payload = [];
    this._postService.getUserPosts(this.userId).subscribe(data=>{
      data.forEach(item => {
        let processedItem = item.payload.doc.data();
        this.payload = [...this.payload,processedItem];
      });
    })
  }
 
  getUserQuestions = () => {
    this.forumService.getQuestionBy(this.userId,'usuario').subscribe(data=>{

      data.forEach(item => {
        let processedItem = item.payload.doc.data();
        this.payload = [...this.payload,processedItem];
      });
      console.log(this.payload);
    })
  }

  getUserResponses = () => {
    this.forumService.getResponsesBy(this.userId,'usuario').subscribe(data=>{

      data.forEach(item => {
        let processedItem = item.payload._delegate.doc._document.data.value.mapValue.fields;
        this.payload = [...this.payload,{...processedItem}];

        // let responseId = item.payload._delegate.doc._document.key.path.segments[6];
        // this.forumService.getLikesResponse(responseId).subscribe(data => processedItem.likes = data.length);
        // console.log(processedItem);
      });
      console.log(this.payload);
    })
  }

  getUserFollowing = () => {
    this.payload = [];
    this.followService.getUserFollows(this.userId).subscribe(data=>{
      data.forEach(item => {
        let processedItem = item.payload.doc.data();
        this.payload = [...this.payload,processedItem];
      });
      console.log(this.payload);
    })
  }

  getUserFollowers = () => {
    this.payload = [];
    this.followService.getUserFollowers(this.userId).subscribe(data=>{
      data.forEach(item => {
        let processedItem = item.payload.doc.data();
        this.payload = [...this.payload,processedItem];
      });
      console.log(this.payload);
    })
  }
}
