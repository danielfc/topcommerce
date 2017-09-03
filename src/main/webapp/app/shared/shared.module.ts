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

@NgModule({
    imports: [
        TopcommerceSharedLibsModule,
        TopcommerceSharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        ShortenPipe
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
        ShortenPipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class TopcommerceSharedModule {}
