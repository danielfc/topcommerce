import {Product} from '../entities/product/product.model';
import {Injectable} from '@angular/core';
import {CartService} from '../cart/cart.service';
import {OrderItem} from './order/order-item.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CheckoutService {

    orderItems: OrderItem[] = [];
    orderItemsChanged = new Subject<OrderItem[]>();

    constructor(private cartService: CartService) {
        this.cartService.getProducts().forEach((product) => this.orderItems.push(new OrderItem(null, product, 1)));
        this.cartService.onCartChanged.subscribe((products: Product[]) => {
            this.orderItems = [];
            products.forEach((product) => this.orderItems.push(new OrderItem(null, product, 1)));
            this.orderItemsChanged.next(this.orderItems);
        });
    }

    removeItem(productId: number) {
        this.cartService.removeProduct(productId);
    }
}
