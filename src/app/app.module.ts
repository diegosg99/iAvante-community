import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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
import { HttpClientModule } from '@angular/common/http';
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
import { SortPipe } from './pipes/sort.pipe';
import { SearchComponent } from './views/search/search.component';
import { TopQuestionsComponent } from './views/panels/top-questions/top-questions.component';
import { CalendarComponent } from './views/panels/calendar/calendar.component';
import { SortDescPipe } from './pipes/sort-desc.pipe';
// import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventsService } from './services/events.service';
import { CreateEventComponent } from './views/events/create-event/create-event.component';
import { EventComponent } from './views/events/event/event.component';
import { LobbyChatComponent } from './views/chat/lobby-chat/lobby-chat.component';
import { MiniUserComponent } from './views/profile/mini-user/mini-user.component';
import { EventListComponent } from './views/events/event-list/event-list.component';
import { DateService } from './services/date.service';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

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
    PostNewsComponent,
    SortPipe,
    SearchComponent,
    TopQuestionsComponent,
    CalendarComponent,
    SortDescPipe,
    CreateEventComponent,
    EventComponent,
    LobbyChatComponent,
    MiniUserComponent,
    EventListComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory,
    // }),
    CalendarModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot()   
  ],
  providers: [OauthService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },{provide: LocationStrategy, useClass: HashLocationStrategy},
    LikeService,
    NewsService,
    ToastrService,
    LockService,
    PostService,
    EventsService,
    DateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

