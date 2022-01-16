import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {environment} from "../../environments/environment";
import {CheckoutModule} from "./checkout.module";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(CheckoutModule)
  .catch(err => console.error(err));
