import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TopcommerceSharedModule } from '../../shared';
import {
    OrderItemService,
    OrderItemPopupService,
    OrderItemComponent,
    OrderItemDetailComponent,
    OrderItemDialogComponent,
    OrderItemPopupComponent,
    OrderItemDeletePopupComponent,
    OrderItemDeleteDialogComponent,
    orderItemRoute,
    orderItemPopupRoute,
} from './';

const ENTITY_STATES = [
    ...orderItemRoute,
    ...orderItemPopupRoute,
];

@NgModule({
    imports: [
        TopcommerceSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OrderItemComponent,
        OrderItemDetailComponent,
        OrderItemDialogComponent,
        OrderItemDeleteDialogComponent,
        OrderItemPopupComponent,
        OrderItemDeletePopupComponent,
    ],
    entryComponents: [
        OrderItemComponent,
        OrderItemDialogComponent,
        OrderItemPopupComponent,
        OrderItemDeleteDialogComponent,
        OrderItemDeletePopupComponent,
    ],
    providers: [
        OrderItemService,
        OrderItemPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TopcommerceOrderItemModule {}
