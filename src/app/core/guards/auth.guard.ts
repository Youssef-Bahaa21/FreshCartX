import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const pLATRFORM_ID = inject(PLATFORM_ID)
if (isPlatformBrowser(pLATRFORM_ID)) {
  if (localStorage.getItem('token')!=null) {
    return true;

}else{
router.navigate(['/login'])
return false
}
}else{
  return false
}
};
