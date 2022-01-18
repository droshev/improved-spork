import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ProductItem} from "../../store.service";
import {SafeResourceUrl} from "@angular/platform-browser";
import {ThemeServiceOutput, ThemesService} from "@fundamental-ngx/core/utils";

export interface Breadcrumb {
  title: string;
  href?: string;
}

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ShellComponent {

  @Input()
  set productsInCart(value: ProductItem[]) {
    this.count = value.length;
  };

  @Input()
  callbackFunction: () => void = () => {
    if (this.count === 0) {
      alert('You need to add some products to your cart first.');
      return;
    }
    window.location.href = '/checkout';
  }

  @Input()
  set themeChange(value: (theme: ThemeServiceOutput) => void) {
    this._themeChange = value;
    setTimeout(() => {
      this._themeChange(this.currentTheme);
    })
  }

  @Input()
  set breadcrumbs(value: Breadcrumb[]) {
    this._breadcrumbs = value;
  }

  count = 0;

  _breadcrumbs: Breadcrumb[] = [];

  cssUrl?: SafeResourceUrl;
  cssCustomUrl?: SafeResourceUrl;
  currentTheme!: ThemeServiceOutput;

  private _themeChange: (theme: ThemeServiceOutput) => void = (theme: ThemeServiceOutput) => {};

  constructor(private _themesService: ThemesService) {
    const themeFromUrl = this._themesService.getThemesFromURL('sap-theme');

    if (themeFromUrl) {
      this.setTheme(themeFromUrl);
    }

    this._themesService.onThemeQueryParamChange.subscribe((theme) => {
      this.setTheme(theme);
    });
  }

  setTheme(theme: ThemeServiceOutput): void {
    this.currentTheme = theme;
    if (this.themeChange) {
      this.themeChange(this.currentTheme);
    }
  }
}
