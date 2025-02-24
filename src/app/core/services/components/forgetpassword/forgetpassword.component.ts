import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)


step:number=1

  verifyEmail:FormGroup=new FormGroup (
    {
      email:new FormControl(null , [Validators.required , Validators.email])
    })

    verifyCode:FormGroup=new FormGroup (
    {
      resetCode:new FormControl(null , [Validators.required , Validators.pattern(/^\d{6}$/)])
    }
  )
  resetPassword:FormGroup=new FormGroup (
    {
      email:new FormControl(null , [Validators.required , Validators.email]),

      newPassword:new FormControl(null,[
        Validators.required,
        Validators.pattern(/^[A-Z]\w{7,}$/)
      ]),    }
  )


  verifyEmailSubmit():void{

    let emailValue = this.verifyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue( emailValue )
this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
  next:(res)=>{
    if (res.statusMsg === "success") {
      this.step=2
    }
  }
})
  }

  verifyCodeSubmit():void{
    this.authService.setCodeVerify(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res);
        if (res.status === "Success") {
          this.step=3
        }
      }
    })
      }

      resetPasswordSubmit():void{
        this.authService.setResetPassword(this.resetPassword.value).subscribe({
          next:(res)=>{
              localStorage.setItem("token" , res.token)
              this.authService.getUserData()
              this.router.navigate(['/home'])
          }
        })
          }
}   
