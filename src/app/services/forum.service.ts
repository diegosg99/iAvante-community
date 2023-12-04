import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  // userLogged = this.lockService.checkToken();
  user;

  private baseUrl = 'http://217.160.232.46:3000/api'; // TODO IP : 10.111.249.108

  constructor(private http: HttpClient) { }

  //-------------------------------- QUESTIONS -----------------------------

  uploadQuestion = (forum:any): any => {
    return this.http.post(`${this.baseUrl}/upload/question`, forum);
  }

  getQuestions = ():Observable<any> => {
    return this.http.get(`${this.baseUrl}/get/questions`);
  }

  getCategoryQuestions = (category):Observable<any> => {
    return this.http.get(`${this.baseUrl}/get/questions/`+category)
  }

  updateQuestionViews = (question):any => {
    question.views++;
    return this.http.post(`${this.baseUrl}/questions/update/views`, question)
  };

  removeQuestion = (id) => {
  }

  getQuestion = (id:string):any => {
    return this.http.get(`${this.baseUrl}/get/question/`+id);
  }

  getUserQuestions = (uid:string):any => {
    return this.http.post(`${this.baseUrl}/get/user/questions`,{uid:uid});
  }

  deleteQuestion = (uid:string):any => {
    return this.http.post(`${this.baseUrl}/delete/question`,{uid:uid});
  }

  //-------------------------------- QUESTIONS -----------------------------
 
  //-------------------------------- RESPONSES -----------------------------

  uploadResponse = (response): any => {

    return this.http.post(`${this.baseUrl}/upload/comment`,response);
  }

  getResponses = (idQuestion,type = 'question'):any => {
    if (type === 'post') {
      return this.http.post(`${this.baseUrl}/post/comments`,{uid:idQuestion});
    }else{
      return this.http.post(`${this.baseUrl}/questions/comments`,{uid:idQuestion});
    }
  }

  getUserResponses = (uid:string):any => {
    return this.http.post(`${this.baseUrl}/get/user/responses`,{uid:uid});
  }

  likeResponse = (user,target) => {
    console.log(user);
    console.log(target);

    return this.http.post(`${this.baseUrl}/like`,{user:user,target: target});
  }

  removeLikeResponse = (user,target) => {
    return this.http.post(`${this.baseUrl}/unlike`,{user:user,target: target});
  }

  getLikesResponse = (target) => {
    return this.http.post(`${this.baseUrl}/get/likes`,{target: target});
  }

  deleteResponse = (uid:string):any => {
    return this.http.post(`${this.baseUrl}/delete/response`,{uid:uid});
  }
}

