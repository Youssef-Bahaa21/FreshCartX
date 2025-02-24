import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from './../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [UpperCasePipe, RouterLink, CurrencyPipe, TranslatePipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  products: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.filteredProducts = res.data; // Initialize filteredProducts with all products
      }
    });
  }

  filterProducts(): void {
    if (this.searchTerm) {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().startsWith(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products; // If no search term, show all products
    }
  }
  

  addToWishlist(id: string): void {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == "success") {
          this.toastrService.success(res.message, "FreshCart");
        }
      }
    });
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == "success") {
          this.toastrService.success(res.message, "FreshCart");
          this.cartService.cartNumber.set(res.numOfCartItems);
          console.log(this.cartService.cartNumber());
        }
      }
    });
  }
}