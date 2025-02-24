import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
myToken = localStorage.getItem("token")

  constructor(private httpClient : HttpClient){

    effect(()=>{
      localStorage.setItem("cartCount" , this.cartNumber().toString())
    })

  }

  cartNumber:WritableSignal<number>=signal(0)

  addProductToCart(productId:string):Observable<any>{
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,  
 
  {productId}
)
}

updateProductQuantity(productId:string,count:number):Observable<any>{
  return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,  
  
   {count}
 )
 }


 
getLoggedUserCart():Observable<any>{
  return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`
 )
 }


 removeSpecificItem(productId:string):Observable<any>{
  return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`
)
}

clearCart():Observable<any>{
  return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`
)
}
}