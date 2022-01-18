import {DoBootstrap, Injector, NgModule} from '@angular/core';
import { CheckoutComponent } from './checkout/checkout.component';
import {createCustomElement} from "@angular/elements";
import {BrowserModule} from "@angular/platform-browser";
import {PlatformWizardGeneratorModule} from "@fundamental-ngx/platform";
import {ThemesService} from "@fundamental-ngx/core";

@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    PlatformWizardGeneratorModule
  ],
  exports: [CheckoutComponent]
})
export class CheckoutModule implements DoBootstrap {
  constructor(private injector: Injector) {
    if (!customElements.get('checkout-page')) {
      const el = createCustomElement(CheckoutComponent, {
        injector: this.injector,
      });
      customElements.define('checkout-page', el);
    }
  }

  ngDoBootstrap(): void { }
}
