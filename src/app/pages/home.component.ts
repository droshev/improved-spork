import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductItem, StoreService} from "../store.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {NgElement} from "@angular/elements";
import {Breadcrumb, ShellComponent} from "../shell/shell/shell.component";
import {Router} from "@angular/router";
import {ThemeServiceOutput} from "@fundamental-ngx/core/utils";
import {SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cssUrl?: SafeResourceUrl;
  cssCustomUrl?: SafeResourceUrl;

  breadcrumbs: Breadcrumb[] = [
    {
      title: 'Men',
      href: '#'
    },
    {
      title: 'Shoes',
      href: '#'
    },
    {
      title: 'Workout'
    }
  ];

  list: any[] = [];

  productsInCart: ProductItem[] = [];

  @ViewChild('shell')
  shell!: ElementRef<NgElement & ShellComponent>;

  private _onDestroy$ = new Subject<void>();

  addToCart: (product: ProductItem) => void = (product: ProductItem) => {
    this._storeService.addToCart(product);
  }

  callbackFunction: () => void = () => {
    if (this.productsInCart.length === 0) {
      alert('You need to add some products to your cart first.');
      return;
    }

    this._router.navigate(['/checkout']);
  }

  onThemeChange: (theme: ThemeServiceOutput) => void = (theme) => {
    if (!theme) {
      return;
    }
    this.cssCustomUrl = theme.customThemeUrl;
    this.cssUrl = theme.themeUrl;
  };

  constructor(private _storeService: StoreService, private _router: Router) {
    this._storeService.products$.pipe(takeUntil(this._onDestroy$)).subscribe((products) => {
      this.list = products;
    });

    this._storeService.productsInCart$.pipe(takeUntil(this._onDestroy$)).subscribe((ids) => {
      this.productsInCart = ids;

      if (this.shell) {
        this.shell.nativeElement.productsInCart = this.productsInCart;
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

}
