import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private baseUrl = 'http://localhost:3003/api';  // TODO IP : 10.111.249.108


  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  getUserFollows = (userId):any => {
    return this.http.post(`${this.baseUrl}/get/follows`, {uid:userId});
  }

  getUserFollowers = (userId):any => {
    return this.http.post(`${this.baseUrl}/get/followers`, userId);
  }

  getUserFollowsData = (userId):any => {
    return this.http.post(`${this.baseUrl}/get/follows/data`, {uid:userId});
  }

  getUserFollowersData = (userId):any => {
    return this.http.post(`${this.baseUrl}/get/followers/data`, {uid:userId});
  }

  followUser = (followed,follower) => {
    const FOLLOW = {
      followed: followed,
      follower: follower,
      both: followed+'&union&'+follower
    }

    return this.http.post(`${this.baseUrl}/follow`, FOLLOW);
  }

  unfollowUser = (followed,follower) => {
    
    const FOLLOW = {
      followed: followed,
      follower: follower,
      both: followed+'&union&'+follower
    }

    console.log(FOLLOW);

    return this.http.post(`${this.baseUrl}/unfollow`, FOLLOW);
  }

  checkFollow = (followed,follower) => {

    const FOLLOW = {
      followed: followed,
      follower: follower,
      both: followed+'&union&'+follower
    }

    return this.http.post(`${this.baseUrl}/follow/check`, FOLLOW);
  }
}
