import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  products!: ProductItem[];
  productsInCart: ProductItem[] = [];

  get products$(): Observable<ProductItem[]> {
    return this._productsSubject.asObservable();
  }

  get productsInCart$(): Observable<ProductItem[]> {
    return this._productsInCartSubject.asObservable();
  }

  private _productsSubject = new BehaviorSubject<ProductItem[]>(this.products);
  private _productsInCartSubject = new BehaviorSubject<ProductItem[]>([]);

  constructor() {
    this.products = new Array(20).fill({}).map((_, id) => ({
      id: id.toString(),
      title: `Title ${id}`,
      description: `Description ${id}`,
      image: `https://picsum.photos/id/${id+1025}/300/200`
    }));

    this._productsSubject.next(this.products);

    if (localStorage.getItem('cart')) {
      this.productsInCart = JSON.parse(localStorage.getItem('cart') as string) as ProductItem[];
    }
  }

  addToCart(product: ProductItem): void {
    this.productsInCart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.productsInCart));
    this._productsInCartSubject.next(this.productsInCart);
  }
}
