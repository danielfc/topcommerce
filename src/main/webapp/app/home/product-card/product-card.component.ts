import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Product} from '../../entities/product/product.model';
import {CartService} from '../../cart/cart.service';

@Component({
    selector: 'jhi-product-card',
    templateUrl: './product-card.component.html',
    styles: []
})
export class ProductCardComponent implements OnInit {

    @HostBinding('class') cssClass = 'col-xs-3 m-3';

    @Input()
    product: Product;

    constructor(private cartService: CartService) {
    }

    ngOnInit() {
    }

    addToCart(product: Product) {
        this.cartService.addProduct(product);
    }

}