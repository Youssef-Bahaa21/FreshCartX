import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroments';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
myToken = localStorage.getItem("token")
  constructor( private httpClient:HttpClient) { }
  userData:any
     private readonly router=inject(Router)

  sendRegisterFrom(data:object):Observable<any>{
    
   return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/signup`,data)
  }  

  
  sendLoginFrom(data:object):Observable<any>{
    
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/signin`,data)
   }

   getUserData():void{
this.userData=    jwtDecode(localStorage.getItem('token') !)
console.log(this.userData);

}

logoutUser () :void {
  localStorage.removeItem('token')
  this.userData=null
  this.router.navigate(['/login'])
}

setEmailVerify(data:object) :Observable<any> {
  return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/forgotPasswords`,data)
}

setCodeVerify(data:object) :Observable<any> {
  return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/verifyResetCode`,data)
}
setResetPassword(data:object) :Observable<any> {
  return this.httpClient.put(`${enviroment.baseUrl}/api/v1/auth/resetPassword`,data)
}
}
