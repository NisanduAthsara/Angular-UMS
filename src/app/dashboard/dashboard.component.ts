import { Component, OnInit } from '@angular/core';
import {FuncsService} from '../funcs.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUserEmail:string = ""
  currentUserId:string = ""
  currentUserName:string = ""
  cuurentUserPassword:string = ""
  isDelete:boolean = false
  isUpdate:boolean = false
  isToggle:boolean = false
  error:string = ""
  success:string = ""

  username = "Nisandu"
  allUsers:any[] = []
  constructor(private funcs:FuncsService,private router:Router) { }

  fetchAll(){
    this.funcs.fetchUsers().subscribe(data =>{
      if(!data.success){
        this.router.navigate([''])
      }
      if(data.users){
        this.allUsers = data.users
      }
    })
  }

  ngOnInit(): void {
    if(!localStorage.getItem('isLoggedIn') || !localStorage.getItem('token')){
      this.router.navigate([''])
    }
    this.fetchAll()
  }

  handleUserData(userData:any){
    this.currentUserId = userData._id
    this.currentUserEmail = userData.email
    this.currentUserName = userData.username
    this.cuurentUserPassword = userData.password
    this.isDelete = userData.isDelete
    this.isUpdate = userData.isUpdate
    this.isToggle = this.isDelete || this.isUpdate
  }

  confirmDel(){
    this.reset2()
    this.funcs.delUser(this.currentUserId)
      .subscribe(data =>{
        if(data.success){
          this.success = data.message
          this.fetchAll()
          setTimeout(()=>{
            this.reset2()
          },3000)
        }else{
          this.error = data.message
          this.fetchAll()
          this.reset()
          setTimeout(()=>{
            this.reset2()
          },3000)
        }
      })
      this.reset()
  }

  cancleDel(){
    this.reset()
    this.reset2()
  }

  handleSubmit(event:any){
    event.preventDefault()
    this.reset2()
    const {target} = event
    const updatedUsername = target.querySelector('#username').value
    const updatedEmail = target.querySelector('#email').value
    this.funcs.updateUser(this.currentUserId,updatedUsername,updatedEmail,this.cuurentUserPassword)
      .subscribe(data =>{
        if(data.success){
          this.success = data.message
          this.fetchAll()
          this.reset()
          setTimeout(()=>{
            this.reset2()
          },3000)
        }else{
          this.error = data.message
          this.fetchAll()
          this.reset()
          setTimeout(()=>{
            this.reset2()
          },3000)
        }
      })
  }

  logout(){
    this.reset2()
    if(localStorage.getItem('isLoggedIn') && localStorage.getItem('token')){
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('token')
      this.router.navigate([''])
    }
  }

  cancleUpdate(){
    this.reset()
    this.reset2()
  }

  reset(){
    this.isUpdate = false
    this.isDelete = false
    this.isToggle = false
    this.currentUserId = ""
    this.currentUserEmail = ""
    this.currentUserName = ""
    this.cuurentUserPassword = ""
  }

  reset2(){
    this.success = ""
    this.error = ""
  }

  updateUser(details:any){
    const resData = {...details,isUpdate:true,isDelete:false}
    this.handleUserData(resData)
  }

  deleteUser(details:any){
    const resData = {...details,isUpdate:false,isDelete:true}
    this.handleUserData(resData)
  }
}
