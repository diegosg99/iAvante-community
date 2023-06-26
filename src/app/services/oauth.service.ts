import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private auth: AngularFireAuth) { }

  register = async (email:string, password: string) => {

    try {
      return await this.auth.createUserWithEmailAndPassword(email,password);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  login = async (email:string, password: string) => {

    try {
      return await this.auth.signInWithEmailAndPassword(email,password);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  loginWithGoogle = async (email:string, password: string) => {

    try {
      return await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  getUserLogged = () => {
    return this.auth.authState;
  }

  logout = () => {
    return this.auth.signOut();
  }
}
