import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AboutComponent} from './about.component';
import {ABOUT_ROUTE} from './about.route';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild(ABOUT_ROUTE)
    ],
    declarations: [
        AboutComponent
    ],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TopcommerceAboutModule {
}
