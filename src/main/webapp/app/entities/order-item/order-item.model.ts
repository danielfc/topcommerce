import { BaseEntity } from './../../shared';

export class OrderItem implements BaseEntity {
    constructor(
        public id?: number,
        public order?: BaseEntity,
        public product?: BaseEntity,
    ) {
    }
}
