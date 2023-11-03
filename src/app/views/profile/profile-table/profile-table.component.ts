import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FollowService } from 'src/app/services/follow.service';
import { ForumService } from 'src/app/services/forum.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.scss']
})
export class ProfileTableComponent implements OnInit{

  @Input() $userLogged:any;
  @Input() $userSelected:any;
  userId = this.activatedRoute.snapshot.paramMap.get('id');
  userLoggedData;
  userData;
  payload;
  p;

  //----------------------------------- DATA SUBS --------------------------------

  $posts:Observable<any> = this._postService.getUserPosts(this.userId);
  $questions:Observable<any> = this.forumService.getUserQuestions(this.userId);
  $responses:Observable<any> = this.forumService.getUserResponses(this.userId);
  $followed:Observable<any> = this.followService.getUserFollowsData(this.userId);
  $followers:Observable<any> = this.followService.getUserFollowersData(this.userId);

  factory;
  category = 'posts';

  constructor(private _postService: PostService, private forumService: ForumService, private followService: FollowService,private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.$userSelected.subscribe(res=> {
      this.userData = res;
    });
    this.$userLogged.subscribe(res=> {
      this.userLoggedData = res;
    })
  }

  displayData = (category) => {
    this.category = category;
  }

  // payloadFactory = (category) => {
  //   this.payload = [];
  //   this.category = category;
  //   this.factory[category]();
  // }

  // getUserPosts = () => {
  //   this.payload = [];
  //   this._postService.getUserPosts(this.userId).subscribe(data=>{
  //     data.forEach(item => {
  //       let processedItem = item.payload.doc.data();
  //       this.payload = [...this.payload,processedItem];
  //     });
  //   })
  // }
 
  // getUserQuestions = () => {
  //   this.forumService.getQuestionBy(this.userId,'usuario').subscribe(data=>{

  //     data.forEach(item => {
  //       let processedItem = item.payload.doc.data();
  //       this.payload = [...this.payload,processedItem];
  //     });
  //     console.log(this.payload);
  //   })
  // }

  // getUserResponses = () => {
  //   this.forumService.getResponsesBy(this.userId,'usuario').subscribe(data=>{

  //     data.forEach(item => {
  //       let processedItem = item.payload._delegate.doc._document.data.value.mapValue.fields;
  //       this.payload = [...this.payload,{...processedItem}];

  //       // let responseId = item.payload._delegate.doc._document.key.path.segments[6];
  //       // this.forumService.getLikesResponse(responseId).subscribe(data => processedItem.likes = data.length);
  //       // console.log(processedItem);
  //     });
  //     console.log(this.payload);
  //   })
  // }

  // getUserFollowing = () => {
  //   this.payload = [];
  //   this.followService.getUserFollows(this.userId).subscribe(data=>{
  //     data.forEach(item => {
  //       let processedItem = item.payload.doc.data();
  //       this.payload = [...this.payload,processedItem];
  //     });
  //     console.log(this.payload);
  //   })
  // }

  // getUserFollowers = () => {
  //   this.payload = [];
  //   this.followService.getUserFollowers(this.userId).subscribe(data=>{
  //     data.forEach(item => {
  //       let processedItem = item.payload.doc.data();
  //       this.payload = [...this.payload,processedItem];
  //     });
  //     console.log(this.payload);
  //   })
  // }
}
