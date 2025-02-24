import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private httpClient:HttpClient) { }

  getAllCategories():Observable<any>{
    return this.httpClient.get(`${enviroment.baseUrl}/api/v1/categories`)
  }  
  getSpecificCategories(id:string):Observable<any>{
    
   return this.httpClient.get(`${enviroment.baseUrl}/api/v1/categories/${id}`)
  }

 


}
