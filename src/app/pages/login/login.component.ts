import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
msgError:string = ""
Success:string=""
private readonly authService=inject(AuthService)
private readonly router=inject(Router)


  loginForm:FormGroup=new FormGroup({
 
    email:new FormControl(null,[
      Validators.required,
      Validators.email,
    ]),
    password:new FormControl(null,[
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/)
    ]),
 
  
  });

  submitFrom():void{
   if (this.loginForm.valid) {
    this.authService.sendLoginFrom(this.loginForm.value).subscribe({
      next:(res)=>{
          console.log(res);
          if(res.message==='success'){
            setTimeout(() => {
              localStorage.setItem("token",res.token)
this.authService.getUserData()


            this.router.navigate(['/home'])
              
            }, 500);
            this.Success=res.message
          }
      },
      error:(err:HttpErrorResponse)=>{
     this.msgError=   err.error.message
         
        
      }
    })
    
   }
  }

 
}
