import { Component, computed, inject, input, InputSignal, OnInit, Signal, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/mytranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private readonly myTranslateService = inject(MyTranslateService);
  private readonly cartService = inject(CartService);
  readonly authService = inject(AuthService);
  private readonly translateService = inject(TranslateService);
  isMobileMenuOpen = false;
  isDropdownOpen = false;
  isMobileDropdownOpen = false;

  isLogin: InputSignal<boolean> = input<boolean>(true);

  countCart: Signal<number> = computed(() => this.cartService.cartNumber());

  constructor(
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMobileMenuOpen = false;
        this.isMobileDropdownOpen = false;
      }
    });
  }

  ngOnInit(): void {

    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartNumber.set(res.numOfCartItems);
      }
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMobileDropdown() {
    this.isMobileDropdownOpen = !this.isMobileDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('#dropdownHoverButton') && !target.closest('#dropdownHover')) {
      this.isDropdownOpen = false;
    }
  }

  change(lang: string): void {
    this.closeAllMenus();
    this.myTranslateService.changeLangTranslate(lang);
  }

  private closeAllMenus(): void {
    this.isDropdownOpen = false;
    this.isMobileMenuOpen = false;
    this.isMobileDropdownOpen = false;
  }

  currentLang(lang: string): boolean {
    return this.translateService.currentLang == lang;
  }
}