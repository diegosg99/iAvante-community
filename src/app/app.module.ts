import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from './environments/environment';
import { OauthService } from './services/oauth.service';
import { LockService } from './services/lock.service';
import { NavbarComponent } from './views/navbar/navbar.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { ChatComponent } from './views/chat/chat.component';
import { ParallaxComponent } from './views/parallax/parallax.component';
import { ParallaxDirective } from './parallax.directive';
import { FooterComponent } from './views/footer/footer.component';
import { UploadPostComponent } from './views/upload-post/upload-post.component';
import { ToastrModule,ToastrService } from 'ngx-toastr';
import { LikeBookmarkComponent } from './views/like-bookmark/like-bookmark.component';
import { PostComponent } from './views/post/post.component';
import { LikeService } from './services/like.service';
import { PostService } from './services/post.service';
import { NewsComponent } from './views/news/news.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewsService } from './services/news.service';
import { ForumComponent } from './views/forum/forum.component';
import { ForumCategoriesComponent } from './views/forum/forum-categories/forum-categories.component';
import { ForumCommentComponent } from './views/forum/forum-comment/forum-comment.component';
import { ForumNewQuestionComponent } from './views/forum/forum-new-question/forum-new-question.component';
import { ForumQuestionComponent } from './views/forum/forum-question/forum-question.component';
import { ForumResponseComponent } from './views/forum/forum-response/forum-response.component';
import { ProfileComponent } from './views/profile/profile.component';
import { MembersComponent } from './views/members/members.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuestionListComponent } from './views/forum/question-list/question-list.component';
import { LearnWithUsComponent } from './views/learn-with-us/learn-with-us.component';
import { UserCardComponent } from './views/members/user-card/user-card.component';
import { FullPostComponent } from './views/post/full-post/full-post.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { LandingComponent } from './views/landing/landing.component';
import { ProfileDataComponent } from './views/profile/profile-data/profile-data.component';
import { ProfileTableComponent } from './views/profile/profile-table/profile-table.component';
import { OtherProfileComponent } from './views/profile/other-profile/other-profile.component';
import { PostImageUploaderComponent } from './views/media/post-img-wrapper/post-img-wrapper.component';
import { FollowsComponent } from './views/post/follows/follows.component';
import { PostNewsComponent } from './views/post/news/news.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
    ChatComponent,
    ParallaxComponent,
    ParallaxDirective,
    FooterComponent,
    UploadPostComponent,
    LikeBookmarkComponent,
    PostComponent,
    NewsComponent,
    ForumComponent,
    ForumCategoriesComponent,
    ForumCommentComponent,
    ForumNewQuestionComponent,
    ForumQuestionComponent,
    ForumResponseComponent,
    ProfileComponent,
    MembersComponent,
    QuestionListComponent,
    LearnWithUsComponent,
    UserCardComponent,
    FullPostComponent,
    AboutUsComponent,
    LandingComponent,
    ProfileDataComponent,
    ProfileTableComponent,
    OtherProfileComponent,
    PostImageUploaderComponent,
    FollowsComponent,
    PostNewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    
  ],
  providers: [OauthService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },{provide: LocationStrategy, useClass: HashLocationStrategy},
    LikeService,
    NewsService,
    ToastrService,
    LockService,
    PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
function getFirestore() {
  throw new Error('Function not implemented.');
}

function provideAuth(arg0: () => import("@firebase/auth").Auth): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

function provideFirestore(arg0: () => void): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

