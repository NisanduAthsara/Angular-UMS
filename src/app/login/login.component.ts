import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error:string = ""
  

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')){
      localStorage.removeItem('isLoggedIn')
    }
    if(localStorage.getItem('token')){
      localStorage.removeItem('token')
    }
  }

  handleSubmit(event:any){
    event.preventDefault()

    const target = event.target
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value

    this.auth.login(email,password)
      .subscribe(data =>{
        if(data.success){
          localStorage.setItem('isLoggedIn',"true")
          if(data.token && typeof data.token === 'string'){
            localStorage.setItem('token',data.token)
          }
          this.router.navigate(['dashboard'])
        }else{
          if(data.message && typeof data.message === 'string'){
            this.error = data.message
            setTimeout(()=>{
              this.error = ""
            },3000)
          }
        }
      })
  }

}
