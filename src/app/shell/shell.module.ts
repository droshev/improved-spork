import {DoBootstrap, Injector, NgModule} from '@angular/core';
import { ShellComponent } from './shell/shell.component';
import {BrowserModule} from "@angular/platform-browser";
import {
  BreadcrumbModule,
  DynamicPageModule,
  FundamentalNgxCoreModule,
  ShellbarModule,
  ThemesService
} from "@fundamental-ngx/core";
import {createCustomElement} from "@angular/elements";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ShellComponent
  ],
  imports: [
    BrowserModule,
    BreadcrumbModule,
    DynamicPageModule,
    ShellbarModule,
    RouterModule
  ],
  exports: [ShellComponent],
  providers: [ThemesService]
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
