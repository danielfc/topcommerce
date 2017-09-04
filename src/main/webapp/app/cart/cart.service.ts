import {Subject} from 'rxjs/Subject';
import {Product} from '../entities/product/product.model';
import {LocalStorageService} from 'ng2-webstorage';
import {Injectable} from '@angular/core';

const CART_KEY = 'cart';

@Injectable()
export class CartService {

    private products: Product[] = [];
    onCartChanged = new Subject<Product[]>();

    constructor(private localStorage: LocalStorageService) {
        this.products.push(...JSON.parse(this.localStorage.retrieve(CART_KEY)));
        this.onCartChanged.next(this.products.slice());
    }

    addProduct(product: Product) {
        this.products.push(product);
        this.onCartChanged.next(this.products.slice());
        this.store();
    }

    removeProduct(id: number) {
        const index = this.products.findIndex((product) => product.id === id);
        this.products.splice(index, 1);
        this.onCartChanged.next(this.products.slice());
        this.store();
    }

    getProducts() {
        return this.products;
    }

    store() {
        this.localStorage.store(CART_KEY, JSON.stringify(this.products));
    }

    clear() {
        this.localStorage.clear(CART_KEY);
        this.products = [];
        this.onCartChanged.next(this.products.slice());
    }
}
