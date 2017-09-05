import {Product} from '../entities/product/product.model';
import {Injectable} from '@angular/core';
import {CartService} from '../cart/cart.service';
import {Subject} from 'rxjs/Subject';
import {OrderService} from '../entities/order/order.service';
import {JhiAlertService} from 'ng-jhipster';
import {OrderItem} from '../entities/order-item/order-item.model';
import {Order} from '../entities/order/order.model';
import {Router} from '@angular/router';

@Injectable()
export class CheckoutService {

    orderItems: OrderItem[] = [];
    orderItemsChanged = new Subject<OrderItem[]>();
    order: Order;

    constructor(private cartService: CartService,
                private orderService: OrderService,
                private alertService: JhiAlertService,
                private router: Router) {
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

    finish(token: any) {
        this.order = new Order();
        this.order.orderItems = this.orderItems;
        this.order.stripeToken = token.id;
        this.orderService.create(this.order).subscribe(
            (order: Order) => {
                this.alertService.success(`Order ${order.code} created successfully!`);
                this.cartService.clear();
                this.router.navigate(['/order', order.id]);
            },
            (error) => {
                this.alertService.error(`An error occurred while placing the order`);
                console.log(error);
            }
        );
    }
}
