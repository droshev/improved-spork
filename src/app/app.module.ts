import {CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home.component';
import {FundamentalNgxCoreModule, ShellbarModule} from "@fundamental-ngx/core";
import {FundamentalNgxPlatformModule} from "@fundamental-ngx/platform";
import { CheckoutPageComponent } from './pages/checkout-page.component';
import {ProductsGridModule} from "./products-grid/products-grid.module";
import {ShellModule} from "./shell/shell.module";
import {CheckoutModule} from "./checkout/checkout.module";

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
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
