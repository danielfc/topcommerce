import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {TopcommerceSharedModule} from '../shared';

import {HOME_ROUTE, HomeComponent} from './';
import {ProductCardComponent} from './product-card/product-card.component';

@NgModule({
    imports: [
        TopcommerceSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent,
        ProductCardComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TopcommerceHomeModule {}
