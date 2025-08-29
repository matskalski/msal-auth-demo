import { Routes } from '@angular/router';
import { PublicPage } from './components/public-page/public-page';
import { RestrictedPage } from './components/restricted-page/restricted-page';
import { msalGuard } from './guards/msal-guard';

export const routes: Routes = [{
        path: 'public-page',
        component: PublicPage
    },
    {
        path: 'restricted-page',
        component: RestrictedPage,
        canActivate: [msalGuard]
    },
    {
        path: '**',
        component: PublicPage
    }

];
