import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  imports: [CommonModule, TranslatePipe],
})
export class CategoriesComponent implements OnInit {
  
  categories: Icategory[] = []; 
  subCategories: Icategory[] = []; // Store subcategories separately

  constructor(private readonly categoryService: CategoriesService) {} 

  ngOnInit(): void {
    this.getCategoriesData();
  }

  getCategoriesData(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      }
    });
  } 


}
