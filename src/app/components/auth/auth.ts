import { Component } from '@angular/core';
import { MSAL_INSTANCE, MsalModule, MsalService } from '@azure/msal-angular'
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

export function MsalInterfaceFactory() : IPublicClientApplication{
  return new PublicClientApplication({
    auth: {
      clientId: '359c5e12-0e9f-4077-8945-7f6e7c0b807e',
      redirectUri: 'http://localhost:4200'
    }
  })
}

@Component({
  selector: 'app-auth',
  imports: [MsalModule],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MsalInterfaceFactory
    },
    MsalService
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {

}
