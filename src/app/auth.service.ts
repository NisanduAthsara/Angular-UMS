import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

interface registerRes {
  success:boolean,
  message:String,
  token?:String
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(username:String,email:String,password:String){
    return this.http.post<registerRes>('http://localhost:8080/api/register',{
      username,email,password
    })
  }

  login(email:String,password:String){
    return this.http.post<registerRes>('http://localhost:8080/api/login',{
      email,password
    })
  }
}
