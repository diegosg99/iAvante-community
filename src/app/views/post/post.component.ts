import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{

  @Input() post:any;
  postId:any;
  postUser:any;

  constructor(private _postService: PostService,private router:Router,private _activatedroute:ActivatedRoute, private userService: UserService){
  }

  ngOnInit(): void {
    this.postId = this._activatedroute.params;
    this.getPostUser();
  }

  getPostUser = () => {
    this.userService.getUser(this.post.usuario).subscribe((user:any)=>{

      this.postUser = {...user.payload._delegate._document.data.value.mapValue.fields};
    })
  }
}
