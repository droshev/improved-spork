import {DoBootstrap, Injector, NgModule} from '@angular/core';
import { ShellComponent } from './shell/shell.component';
import {BrowserModule} from "@angular/platform-browser";
import {BreadcrumbModule, DynamicPageModule, FundamentalNgxCoreModule, ShellbarModule} from "@fundamental-ngx/core";
import {createCustomElement} from "@angular/elements";
import { ContentDensityService } from '@fundamental-ngx/core/utils';



@NgModule({
  declarations: [
    ShellComponent
  ],
  imports: [
    BrowserModule,
    BreadcrumbModule,
    DynamicPageModule,
    ShellbarModule
  ],
  providers:[
    ContentDensityService
  ],
  exports: [ShellComponent]
})
export class ShellModule implements DoBootstrap {
  constructor(private injector: Injector) {
    if (!customElements.get('shell-bar')) {
      const el = createCustomElement(ShellComponent, {
        injector: this.injector,
      });
      customElements.define('shell-bar', el);
    }
  }

  ngDoBootstrap(): void { }
}
