import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {DatePipe} from '@angular/common';

import {
    AccountService,
    AuthServerProvider,
    CSRFService,
    HasAnyAuthorityDirective,
    JhiLoginModalComponent,
    LoginModalService,
    LoginService,
    Principal,
    StateStorageService,
    TopcommerceSharedCommonModule,
    TopcommerceSharedLibsModule,
    UserService
} from './';
import {ShortenPipe} from './shorten/shorten.pipe';
import {PointerDirective} from './pointer/pointer.directive';
import {FilterPipe} from './filter/filter.pipe';

@NgModule({
    imports: [
        TopcommerceSharedLibsModule,
        TopcommerceSharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        ShortenPipe,
        PointerDirective,
        FilterPipe
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        TopcommerceSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        ShortenPipe,
        PointerDirective,
        FilterPipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class TopcommerceSharedModule {}
