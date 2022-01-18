import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {GridListItemOutputEvent} from "@fundamental-ngx/core";

interface GridListItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProductsGridComponent {

  @Input()
  set products(value: GridListItem[]) {
    console.log(value);
    this._products = value;
  };

  @Input()
  addToCart: (product: GridListItem) => void = () => {};

  _products: GridListItem[] = [];

  showAlert(message: string): void {
    alert('Clicked on ' + message);
  }

  navigate(event: GridListItemOutputEvent<number>): void {
    alert('Navigation event value is: ' + event.value);
  }

}
