import {Component, OnInit} from '@angular/core';
import {CheckoutService} from './checkout.service';
import {OrderItem} from './order/order-item.model';

@Component({
    selector: 'jhi-checkout',
    templateUrl: './checkout.component.html',
    styles: []
})
export class CheckoutComponent implements OnInit {

    orderItems: OrderItem[];

    constructor(private checkoutService: CheckoutService) {
    }

    ngOnInit() {
        this.orderItems = this.checkoutService.orderItems;
        this.checkoutService.orderItemsChanged.subscribe((orderItems: OrderItem[]) => this.orderItems = orderItems);
    }

    removeItem(productId: number) {
        this.checkoutService.removeItem(productId);
    }

}
