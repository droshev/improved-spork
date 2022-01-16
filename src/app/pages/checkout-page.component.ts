import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Breadcrumb, ShellComponent} from "../shell/shell/shell.component";
import {NgElement} from "@angular/elements";
import {ProductItem, StoreService} from "../store.service";
import {CheckoutComponent} from "../checkout/checkout/checkout.component";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit, AfterViewInit {

  breadcrumbs: Breadcrumb[] = [
    {
      title: 'Checkout'
    }
  ];

  productsInCart: ProductItem[] = [];

  availableProducts: ProductItem[] = [];

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
