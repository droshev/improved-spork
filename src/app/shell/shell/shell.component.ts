import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductItem} from "../../store.service";

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
export class ShellComponent implements OnInit {

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
  set breadcrumbs(value: Breadcrumb[]) {
    this._breadcrumbs = value;
  }

  count = 0;

  _breadcrumbs: Breadcrumb[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
