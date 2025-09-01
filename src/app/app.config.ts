import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MSAL_INSTANCE, MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from "@azure/msal-browser"
import { environment } from '../environments/environment.development';

export function MsalInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msal.auth.clientId,
      redirectUri: environment.msal.auth.redirectUri
    }
  })
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    {
      provide: MSAL_INSTANCE,
      useFactory: MsalInstanceFactory
    },
    MsalService,
    MsalBroadcastService
  ]
};
