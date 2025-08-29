import { inject, Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  //msalService: MsalService = inject(MsalService);

  constructor(private  msalService: MsalService) {
    this.msalService.initialize()    
  }

  isLogedIn() : boolean {
    return this.msalService.instance.getActiveAccount() != null
  }

  login(){
    this.msalService.loginPopup()
      .subscribe(
        (resp: AuthenticationResult) => {
          this.msalService.instance.setActiveAccount(resp.account)
        }
      )
  }

  logout(){
    this.msalService.logout();
  }

  getUserName(){
    if(this.isLogedIn()){
      return this.msalService.instance.getActiveAccount()?.name
    }

    return '';
  }
}
