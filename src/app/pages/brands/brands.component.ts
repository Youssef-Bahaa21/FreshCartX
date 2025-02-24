import { TranslatePipe } from '@ngx-translate/core';
import { Ibrands } from '../../shared/interfaces/ibrands';
import { BrandsService } from './../../core/services/brands/brands.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{
private readonly  brandsService= inject(BrandsService)


brands:Ibrands[]=[]


ngOnInit(): void {
  this.getBrands()
}
getBrands(){
  this.brandsService.getAllBrands().subscribe({
    next:(res)=>{
      console.log(res.data);
   this.brands  = res.data
    }
  })
}
}
