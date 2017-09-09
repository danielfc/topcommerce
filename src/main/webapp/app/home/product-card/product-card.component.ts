import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Product} from '../../entities/product/product.model';
import {CartService} from '../../cart/cart.service';
import {JhiAlertService} from "ng-jhipster";

@Component({
    selector: 'jhi-product-card',
    templateUrl: './product-card.component.html',
    styles: [
        '.card {width: 12rem;}',
        '.card-title {font-weight: 100;}',
        '.card-text {font-size: 13px}',
        '.card-price {font-size: 24px}'
    ]
})
export class ProductCardComponent implements OnInit {

    @HostBinding('class') cssClass = 'col-xs-3 m-3';

    @Input()
    product: Product;

    constructor(private cartService: CartService,
                private alertService: JhiAlertService) {
    }

    ngOnInit() {
    }

    addToCart(product: Product) {
        this.cartService.addProduct(product);
        this.alertService.info(`${product.name} was added to your cart.`);
    }

}
