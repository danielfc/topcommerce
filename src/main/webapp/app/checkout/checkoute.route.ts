import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import {CheckoutComponent} from './checkout.component';

export const CHECKOUT_ROUTE: Route = {
    path: 'checkout',
    component: CheckoutComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Checkout'
    },
    canActivate: [UserRouteAccessService]
};
