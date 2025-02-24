import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Icategory } from '../../shared/interfaces/icategory'; 
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,UpperCasePipe,CurrencyPipe,RouterLink,TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  private readonly categoryService = inject(CategoriesService)
private readonly wishlistService=inject(WishlistService)
  
  private readonly productsService=inject(ProductsService)
  private readonly cartService=inject(CartService)
  private readonly toastrService = inject(ToastrService)
  

  products:WritableSignal<Iproduct[]> = signal([])

  categories:WritableSignal<Icategory[]> = signal([])



  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: ['', ''],
    rtl:true,
    items:1,
    autoplayTimeout:2200,
    autoplay:true,
    nav: true
  }

  customOptions: OwlOptions = {
    loop: true,
    rtl:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayHoverPause:true,
    autoplayTimeout:2000,
    navSpeed: 500,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }


 

  getProductsData(){
  this.productsService.getAllProducts().subscribe({
    next:(res)=>{
      
      this.products.set(res.data)
        
    }
  })
 
}

  getCategoriesData(){
  this.categoryService.getAllCategories().subscribe({
    next:(res)=>{
      this.categories.set(res.data)
      
        
    }
  })
} 

addToWishlist(id:string){
  this.wishlistService.addProductToWishlist(id).subscribe({
    next:(res)=>{
      console.log(res);
      if (res.status=="success") {
        this.toastrService.success(res.message ,"FreshCart")
      }}
  })
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


ngOnInit(): void {
    this.getProductsData()
    this.getCategoriesData()
}


}
