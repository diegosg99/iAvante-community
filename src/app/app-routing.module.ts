import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { UploadPostComponent } from './views/upload-post/upload-post.component';
import { PostComponent } from './views/post/post.component';
import { NewsComponent } from './views/news/news.component';
import { ForumComponent } from './views/forum/forum.component';
import { ForumQuestionComponent } from './views/forum-question/forum-question.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "publicar",
    component: UploadPostComponent
  },
  {
    path: "post/:id",
    component: PostComponent
  },
  {
    path: "news/:category",
    component: NewsComponent
  },
  {
    path: "foro",
    component: ForumComponent
  },
  {
    path: "foro/:id",
    component: ForumQuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
