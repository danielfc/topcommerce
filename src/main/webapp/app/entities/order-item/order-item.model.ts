import { BaseEntity } from './../../shared';
import {Product} from '../product/product.model';

export class OrderItem implements BaseEntity {
    constructor(
        public id?: number,
        public product?: Product,
        public quantity?: number
    ) {
    }
}
