import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Product} from '../../entities/product/product.model';

@Component({
    selector: 'jhi-product-card',
    templateUrl: './product-card.component.html',
    styles: []
})
export class ProductCardComponent implements OnInit {

    @HostBinding('class') cssClass = 'col-xs-3 m-3';

    @Input()
    product: Product;

    constructor() {
    }

    ngOnInit() {
    }

}
