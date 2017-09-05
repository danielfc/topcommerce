import { BaseEntity, User } from './../../shared';

const enum OrderStatus {
    'CREATED',
    'PENDING',
    'COMPLETED',
    'CANCELED'
}

export class Order implements BaseEntity {
    constructor(
        public id?: number,
        public status?: OrderStatus,
        public createdAt?: any,
        public code?: string,
        public user?: User,
        public orderItems?: BaseEntity[],
        public stripeToken?: string
    ) {
    }
}
