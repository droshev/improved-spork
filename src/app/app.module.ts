import {CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home.component';
import { CheckoutPageComponent } from './pages/checkout-page.component';
import {ProductsGridModule} from "./products-grid/products-grid.module";
import {ShellModule} from "./shell/shell.module";
import {CheckoutModule} from "./checkout/checkout.module";
import {ThemesService} from "@fundamental-ngx/core/utils";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckoutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsGridModule,
    ShellModule,
    CheckoutModule
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
