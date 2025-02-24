import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule,TranslatePipe,RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

data: any[] = [];

private readonly wishlistService=inject(WishlistService)
private readonly cartService=inject(CartService)
private readonly toastrService=inject(ToastrService)


ngOnInit(): void {
this.getLoggedUserWishlist()
}

getLoggedUserWishlist() {
  this.wishlistService.getLoggedUserWishlist().subscribe({
    next: (res) => {
      console.log('API Response:', res); // Log the full response
      this.data = res.data; // Assign the response data to the component property
    }
  });
}


addToCart(id:string){
  
  this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      // toaster
if (res.status=="success") {
  this.toastrService.success(res.message ,"FreshCart")

  this.cartService.cartNumber.set(res.numOfCartItems)
  console.log(this.cartService.cartNumber());
  
}      
    }
  })
}

removeFromWishlist(id:string){
  this.wishlistService.removeProductFromWishlist(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.getLoggedUserWishlist()
      
    }
  })

}


}




