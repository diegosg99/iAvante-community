import { Component, OnInit } from '@angular/core';
import { ReCaptchaEnterpriseProvider } from '@angular/fire/app-check';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { FollowService } from 'src/app/services/follow.service';
import { ForumService } from 'src/app/services/forum.service';
import { OauthService } from 'src/app/services/oauth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  userLogged:any;
  userId;
  user;
  //userForm: FormGroup;
  edit:boolean = false;
  payload;
  p;

  imageFile: { link: string; file: any; name: string; } | any;
  imageRaw: { link: string; file: any; name: string; } | any;

  factory;
  category;

  ROLES = {
    user: 'USUARIO',
    admin: 'ADMIN',
    docent: 'DOCENTE'
  }

  formEdit = {
    realName:false,
    username:false,
    job:false,
    desc:false
  }

  userForm = {
    username: '',
    fullName: '',
    proffesion: '',
    jobCentre: '',
    photo: '',
    age: '',
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: ''
  }

  constructor(
      private auth:OauthService,private userService:UserService,private toastr: ToastrService,
      private router:Router,private _activatedroute:ActivatedRoute,private forumService: ForumService,
      private _postService:PostService, private followService: FollowService){
    
    this.factory = {
      posts: this.getUserPosts,
      questions: this.getUserQuestions,
      responses: this.getUserResponses,
      following: this.getUserFollowing,
      followers: this.getUserFollowers
    }
    
    this._activatedroute.params.subscribe(data=>
      {
        
        this.userId = data['id'];

        this.userService.getUser(this.userId).subscribe(user=>{

          this.user = {...user.payload._delegate._document.data.value.mapValue.fields};
          this.user.role = this.ROLES[this.user.role.stringValue];
        })
      });
  }

  ngOnInit(): void {
    this.payloadFactory('posts');
  }

  updateProfile = () => {

    let userID;
    this.auth.getUserLogged().subscribe(user=> {
      userID = user.uid
      
      const USER: any = {
        uid: userID,
        username: this.userForm.username,
        fullName: this.userForm.fullName,
        proffesion: this.userForm.proffesion,
        jobCentre: this.userForm.jobCentre,
        role: 'USUARIO',
        photo: this.imageFile.link,
        age: this.userForm.age,
        instagram: this.userForm.instagram,
        facebook: this.userForm.facebook,
        twitter: this.userForm.twitter,
        linkedin: this.userForm.linkedin
      }
    
        this.userService.uploadUser(USER).then(()=> {
          this.toastr.success('La publicación se ha registrado con éxito.','¡Genial!');
        },(error: any) => {
          this.toastr.error('Oops.. Ha habido un problema al subir la publicación ¡Intentalo más tarde!','Error!')
          console.log(error);
        });
    });
  }

  imagePreview = (event: any) => {

    if (event.target.files && event.target.files[0]) {
      this.imageRaw = event.target.files[0];

      const reader = new FileReader();

      reader.onload = (_event: any) => {
          this.imageFile = {
              link: _event.target.result,
              file: event.srcElement.files[0],
              name: event.srcElement.files[0].name
          };
      };
      reader.readAsDataURL(event.target.files[0]);
  }
  }

  hide = () => {
    this.edit = this.edit?false:true;
  }

  payloadFactory = (category) => {
    this.payload = [];
    this.category = category;
    this.factory[category]();
    console.log(this.payload);
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
