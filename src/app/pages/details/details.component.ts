import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

  productId:any
  products:Iproduct[]=[]

  productDetails:Iproduct={} as Iproduct;
  private readonly activatedRoute =  inject(ActivatedRoute)
  private readonly productsService =  inject(ProductsService)
  private readonly cartService=inject(CartService)
  private readonly toastrService = inject(ToastrService)



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

  ngOnInit(): void {this.activatedRoute.paramMap.subscribe({
    next:(res)=>{
this.productId= res.get('id')

this.productsService.getSpecificProducts(this.productId).subscribe({
  next:(res)=>{
    this.productDetails= res.data
  }})
        
    },
  })
  }

}
