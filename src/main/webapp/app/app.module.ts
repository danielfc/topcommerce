import './vendor.ts';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2Webstorage} from 'ng2-webstorage';

import {TopcommerceSharedModule, UserRouteAccessService} from './shared';
import {TopcommerceHomeModule} from './home/home.module';
import {TopcommerceAdminModule} from './admin/admin.module';
import {TopcommerceAccountModule} from './account/account.module';
import {TopcommerceEntityModule} from './entities/entity.module';

import {customHttpProvider} from './blocks/interceptor/http.provider';
import {PaginationConfig} from './blocks/config/uib-pagination.config';
import {
    ErrorComponent,
    FooterComponent,
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    PageRibbonComponent,
    ProfileService
} from './layouts';
import {CartService} from './cart/cart.service';
import {TopcommerceCheckoutModule} from './checkout/checkout.module';
import {OrderService} from './entities/order/order.service';
import {TopcommerceAboutModule} from './about/about.module';

// jhipster-needle-angular-add-module-import JHipster will add new module here

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        TopcommerceSharedModule,
        TopcommerceHomeModule,
        TopcommerceAdminModule,
        TopcommerceAccountModule,
        TopcommerceEntityModule,
        TopcommerceCheckoutModule,
        TopcommerceAboutModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService,
        CartService,
        OrderService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class TopcommerceAppModule {}
