import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TopcommerceProductTypeModule } from './product-type/product-type.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TopcommerceProductTypeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TopcommerceEntityModule {}
