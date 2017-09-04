import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {TopcommerceSharedModule} from '../shared';

import {CHECKOUT_ROUTE} from './checkoute.route';
import {CheckoutComponent} from './checkout.component';
import {CheckoutService} from './checkout.service';

@NgModule({
    imports: [
        TopcommerceSharedModule,
        RouterModule.forRoot([ CHECKOUT_ROUTE ], { useHash: true })
    ],
    declarations: [
        CheckoutComponent
    ],
    entryComponents: [
        CheckoutComponent
    ],
    providers: [
        CheckoutService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TopcommerceCheckoutModule {}
