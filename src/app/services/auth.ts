import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  //msalService: MsalService = inject(MsalService);

  constructor(private  msalService: MsalService,
    private router: Router
  ) {
    //this.msalService.initialize() 
    this.initMsal();
  }

  initMsal(): void {
    this.msalService
      .handleRedirectObservable()
      .subscribe((res: AuthenticationResult | null) => {
        if(res){
          this.router.navigate(['/'])
        }
      })
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
