import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartid: string = "";
  checkOutFrom!: FormGroup;
  isLoading = false;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService);
  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (parm) => {
        this.cartid = parm.get('id')!;
      }
    });
  }

  initForm(): void {
    this.checkOutFrom = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    if (this.checkOutFrom.invalid || this.isLoading) return;

    this.isLoading = true;
    this.ordersService.checkOutPayment(this.cartid, this.checkOutFrom.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.status === "success") {
          window.location.href = res.session.url;
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Checkout failed:', err);
        alert('Checkout failed. Please try again.');
      }
    });
  }
}