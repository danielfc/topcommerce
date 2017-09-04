import {BaseEntity} from './../../shared';

export class OrderItem implements BaseEntity {
    constructor(public id?: number,
                public product?: BaseEntity,
                public quantity?: number) {
    }

}
