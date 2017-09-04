import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TopcommerceSharedModule } from '../../shared';
import { TopcommerceAdminModule } from '../../admin/admin.module';
import {
    OrderService,
    OrderPopupService,
    OrderComponent,
    OrderDetailComponent,
    OrderDialogComponent,
    OrderPopupComponent,
    OrderDeletePopupComponent,
    OrderDeleteDialogComponent,
    orderRoute,
    orderPopupRoute,
    OrderResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...orderRoute,
    ...orderPopupRoute,
];

@NgModule({
    imports: [
        TopcommerceSharedModule,
        TopcommerceAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OrderComponent,
        OrderDetailComponent,
        OrderDialogComponent,
        OrderDeleteDialogComponent,
        OrderPopupComponent,
        OrderDeletePopupComponent,
    ],
    entryComponents: [
        OrderComponent,
        OrderDialogComponent,
        OrderPopupComponent,
        OrderDeleteDialogComponent,
        OrderDeletePopupComponent,
    ],
    providers: [
        OrderPopupService,
        OrderResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TopcommerceOrderModule {}
