import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

interface fetchResponse{
  success:boolean,
  message:string,
  users?:any[]
}

@Injectable({
  providedIn: 'root'
})
export class FuncsService {

  constructor(private http:HttpClient) { }

  fetchUsers(){
    const token:any = localStorage.getItem('token') || "false"
    return this.http.post<fetchResponse>('http://localhost:8080/api/get/all',{
      token
    })
  }

  delUser(id:string){
    const token:any = localStorage.getItem('token') || "false"
    return this.http.delete<fetchResponse>(`http://localhost:8080/api/delete/${id}/${token}`)
  }

  updateUser(id:string,username:string,email:string,password:string){
    const token:any = localStorage.getItem('token') || "false"
    return this.http.put<fetchResponse>('http://localhost:8080/api/update',{
      id,
      username,
      password,
      email,
      token
    })
  }
}
