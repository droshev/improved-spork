import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Breadcrumb, ShellComponent} from "../shell/shell/shell.component";
import {NgElement} from "@angular/elements";
import {ProductItem, StoreService} from "../store.service";
import {CheckoutComponent} from "../checkout/checkout/checkout.component";
import {ThemeServiceOutput} from "@fundamental-ngx/core/utils";
import {SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit, AfterViewInit {

  cssUrl?: SafeResourceUrl;
  cssCustomUrl?: SafeResourceUrl;

  breadcrumbs: Breadcrumb[] = [
    {
      title: 'Checkout'
    }
  ];

  productsInCart: ProductItem[] = [];

  availableProducts: ProductItem[] = [];

  onThemeChange: (theme: ThemeServiceOutput) => void = (theme) => {
    if (!theme) {
      return;
    }
    this.cssCustomUrl = theme.customThemeUrl;
    this.cssUrl = theme.themeUrl;
  };

  @ViewChild('shell')
  shell!: ElementRef<NgElement & ShellComponent>;

  @ViewChild('checkout')
  checkout!: ElementRef<NgElement & CheckoutComponent>;

  constructor(private _storeService: StoreService) {
    this.productsInCart = this._storeService.productsInCart;
    this.availableProducts = this._storeService.products;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.checkout.nativeElement.availableProducts = this.availableProducts;
    this.checkout.nativeElement.selectedProducts = this.productsInCart;
  }

}
