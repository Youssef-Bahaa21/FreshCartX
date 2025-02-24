import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import {  CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink , TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']  
})
export class CartComponent {

cartDetails : Icart = { } as Icart

private readonly  cartService = inject(CartService)


  
  ngOnInit(): void {
    
    this.getCartData()
  }

  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({

      next:(res)=>{

this.cartDetails= res.data

      }
    })
  }

  clearItems():void{

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe({
          next:(res)=>{
    
            if (res.message == "success") {
              this.cartDetails = { } as Icart
              this.cartService.cartNumber.set(0)

              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
    
            }
            
                  }
        })
       
      }
    });
    
  
  }

  
  removeItem(id: string): void {
    this.cartService.removeSpecificItem(id).subscribe({
      next: (res) => {
        console.log( res);
          this.cartDetails = res.data
          this.cartService.cartNumber.set(res.numOfCartItems)
      }
    });
  }
  
  isCartEmpty(): boolean {
    return !this.cartDetails.products || this.cartDetails.products.length === 0;
  }

  updateCount(id: string, count: number): void {
    this.cartService.updateProductQuantity(id, count).subscribe({
      next: (res) => {
        console.log( res);

this.cartDetails= res.data


      }
    });
  }
}