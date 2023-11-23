import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  deleteFactory = {
    posts: this._postService.deletePost,
    questions: this.forumService.deleteQuestion,
    responses: this.forumService.deleteResponse
  }

  //----------------------------------- DATA SUBS --------------------------------

  $posts:Observable<any> = this._postService.getUserPosts(this.userId);
  $questions:Observable<any> = this.forumService.getUserQuestions(this.userId);
  $responses:Observable<any> = this.forumService.getUserResponses(this.userId);
  $followed:Observable<any> = this.followService.getUserFollowsData(this.userId);
  $followers:Observable<any> = this.followService.getUserFollowersData(this.userId);

  factory;
  category = 'posts';

  constructor(private _postService: PostService, private forumService: ForumService, private followService: FollowService,private activatedRoute:ActivatedRoute, private toastr:ToastrService){}

  ngOnInit(): void {
    this.$userSelected?.subscribe(res=> {
      this.userData = res;
    });
    this.$userLogged.subscribe(res=> {
      this.userLoggedData = res;
    })
  }

  displayData = (category) => {
    this.category = category;
  }

  removeItem = (id,table) => {
    if (confirm("¿Quieres borrar el elemento?")) {
      this.deleteFactory[table](id).subscribe(res=>console.log(res));
    }
  }

  manageFollow = (id,action) => {
    console.log(id);

    if (action==='unfollow') {
      this.followService.unfollowUser(id,this.userId);
    }

    if (action==='delete') {
      this.followService.unfollowUser(this.userId,id);
    }
  }
}
