import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error:string = ""

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  handleSubmit(event:any){
    event.preventDefault()

    const target = event.target
    const username = target.querySelector('#username').value
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value

    this.auth.register(username,email,password)
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
