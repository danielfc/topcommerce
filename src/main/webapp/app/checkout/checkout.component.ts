import {Component, OnInit} from '@angular/core';
import {CheckoutService} from './checkout.service';
import {OrderItem} from '../entities/order-item/order-item.model';

@Component({
    selector: 'jhi-checkout',
    templateUrl: './checkout.component.html',
    styles: []
})
export class CheckoutComponent implements OnInit {

    orderItems: OrderItem[];
    total: number;

    constructor(private checkoutService: CheckoutService) {
    }

    ngOnInit() {
        this.orderItems = this.checkoutService.orderItems;
        this.checkoutService.orderItemsChanged.subscribe((orderItems: OrderItem[]) => this.orderItems = orderItems);
        this.calculateTotal();
    }

    removeItem(productId: number) {
        this.checkoutService.removeItem(productId);
    }

    calculateTotal() {
        this.total = 0.0;
        this.orderItems.forEach((item: OrderItem) => this.total += (item.quantity * item.product.price));
    }

    finish() {
        const handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_pDUla1hJ1rG4ICitozQijxw9',
            locale: 'auto',
            token: (token: any) => {
                console.log(token);
                this.checkoutService.finish(token);
            }
        });

        handler.open({
            name: 'TopCommerce',
            description: 'Checkout',
            amount: this.total * 100
        });
    }
}
