import {  ToastrService } from 'ngx-toastr';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { url } from 'inspector';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
const toastrService = inject(ToastrService);
  return next(req).pipe(
    catchError((err) => {
      console.log('interceptors', err.error.message);
      if (req.url.includes('products')) {
        toastrService.error(err.error.message,"freshCart");
        
      }
      return throwError(() => err);
    })
  );
};