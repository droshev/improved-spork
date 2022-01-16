import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {environment} from "../../environments/environment";
import {ShellModule} from "./shell.module";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(ShellModule)
  .catch(err => console.error(err));
