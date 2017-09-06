import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PasswordComponent } from './password.component';

export const passwordRoute: Route = {
    path: 'password',
    component: PasswordComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_USER'],
        pageTitle: 'Password'
    },
    canActivate: [UserRouteAccessService]
};
