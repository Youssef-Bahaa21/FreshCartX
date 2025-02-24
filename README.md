# FreshCart

A modern e-commerce platform built with Angular, featuring a responsive design, user authentication, product management, and shopping cart functionality.

## Features

### Authentication & Security
- User registration and login system
- JWT-based authentication
- Protected routes with auth guards
- Password reset functionality
- Automatic logout on token expiration

### Shopping Experience
- Browse products by categories and brands
- Product search and filtering
- Detailed product views
- Add products to cart
- Wishlist functionality
- Secure checkout process

### Cart Management
- Add/remove items
- Update quantities
- Clear cart
- Cart total calculation
- Persistent cart data

### User Interface
- Responsive design
- Loading spinners for better UX
- Toast notifications for user feedback
- Internationalization support
- Custom error handling

### Technical Features
- Lazy loading modules
- HTTP interceptors for:
  - Request/response headers
  - Loading states
  - Error handling
- Server-side rendering (SSR) support
- Environment-based configuration
- Browser platform detection

## Prerequisites

- Node.js 
- Angular CLI
- NPM 

## Key Dependencies

- Angular 
- NgRx for state management
- ngx-spinner for loading states
- ngx-toastr for notifications
- @angular/ssr for server-side rendering
- jwt-decode for token handling
