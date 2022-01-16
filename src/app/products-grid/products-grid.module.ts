import {DoBootstrap, Injector, NgModule} from '@angular/core';

import { ProductsGridComponent } from './products-grid/products-grid.component';
import {AvatarModule, ButtonModule, FundamentalNgxCoreModule, GridListModule, IconModule} from "@fundamental-ngx/core";
import {createCustomElement} from "@angular/elements";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        ProductsGridComponent
    ],
    exports: [
        ProductsGridComponent
    ],
    imports: [
      BrowserModule,
      GridListModule,
      ButtonModule,
      IconModule,
      AvatarModule
    ]
})
export class ProductsGridModule implements DoBootstrap {
  constructor(private injector: Injector) {
    if (!customElements.get('products-grid')) {
      const el = createCustomElement(ProductsGridComponent, {
        injector: this.injector,
      });
      customElements.define('products-grid', el);
    }
  }

  ngDoBootstrap(): void { }
}
