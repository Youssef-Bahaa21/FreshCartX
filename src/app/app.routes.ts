import { WishlistComponent } from './pages/wishlist/wishlist/wishlist.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { ForgetpasswordComponent } from './core/services/components/forgetpassword/forgetpassword.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full'
    },
    {
        path: '', 
        component: AuthLayoutComponent,
        canActivate: [loggedGuard],  // Prevent access to auth routes when logged in
        children: [
            { 
                path: 'register', 
                loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) 
            },
            { 
                path: 'login', 
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) 
            },
            { 
                path: 'forget', 
                component: ForgetpasswordComponent 
            },
        ]
    },
    {
        path: '', 
        component: BlankLayoutComponent, 
        children: [
            // Protected routes requiring authentication
            { 
                path: 'home', 
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), 
                title: 'home',
                canActivate: [authGuard] 
            },
            { 
                path: 'cart', 
                loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), 
                title: 'cart',
                canActivate: [authGuard] 
            },
            { 
                path: 'products', 
                loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), 
                title: 'products',
                canActivate: [authGuard] 
            },
            { 
                path: 'brands', 
                loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), 
                title: 'brands',
                canActivate: [authGuard] 
            },
            { 
                path: 'wishlist', 
                loadComponent: () => import('./pages/wishlist/wishlist/wishlist.component').then(m => m.WishlistComponent), 
                title: 'wishlist',
                canActivate: [authGuard] 
            },
            { 
                path: 'categories', 
                loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), 
                title: 'categories',
                canActivate: [authGuard] 
            },
            { 
                path: 'checkout/:id', 
                component: CheckoutComponent,
                canActivate: [authGuard],
                data: {
                  renderMode: 'client-only'  // Change rendering mode for dynamic routes
                }
            },
            { 
                path: 'details/:id', 
                loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), 
                title: 'details',
                canActivate: [authGuard] 
            },
            { 
                path: 'allorders', 
                loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent),
                canActivate: [authGuard] 
            },

            // Public/fallback routes
            { 
                path: '**', 
                loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent) 
            },
        ]
    }
];