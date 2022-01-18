import {DoBootstrap, Injector, NgModule} from '@angular/core';
import {createCustomElement} from "@angular/elements";
import {BrowserModule} from "@angular/platform-browser";

import {
  AvatarModule,
  ButtonModule,
  GridListModule,
  IconModule,
  ThemesService
} from "@fundamental-ngx/core";
import { ProductsGridComponent } from './products-grid/products-grid.component';

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
