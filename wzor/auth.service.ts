import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus, RedirectRequest, AuthenticationResult } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { environment } from "../../../environments/environment";

export interface IUser {
  username: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router
  ) {
    this.initMsal();
  }

  initMsal(): void {
    this.msalService
      .handleRedirectObservable()
      .subscribe((result: AuthenticationResult | null) => {
        if (result) {
          this.router.navigate(['/orders']);
        }
      });

    this.msalService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED),
      )
      .subscribe((result: EventMessage) => {
        if (this.msalService.instance.getAllAccounts().length === 0) {
          window.location.pathname = "/";
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
      });
  }

  isAuthenticated(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  getUser(): IUser | null {
    let activeAccount = this.msalService.instance.getActiveAccount();
    if (activeAccount) {
      return { username: activeAccount?.username, name: activeAccount?.name ?? "" };
    }

    return null;
  }

  /**
   * If no active account set but there are accounts signed in, sets first account to active account
   * To use active account set here, subscribe to inProgress$ first in your component
   * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
   */
  checkAndSetActiveAccount(): void {
    const activeAccount = this.msalService.instance.getActiveAccount();
    const allAccounts = this.msalService.instance.getAllAccounts();

    if (!activeAccount && allAccounts.length > 0) {
      this.msalService.instance.setActiveAccount(allAccounts[0]);
    }
  }

  isUserInSecurityGroup(): boolean {
    let account = this.msalService.instance.getActiveAccount();
    if (!account) {
      return false;
    }
    let claims = account.idTokenClaims;
    if (!claims) {
      return false;
    }
    let groups = <Array<string>>claims["groups"];

    return groups.includes(environment.adGroup.id);
  }

  loginRedirect(): void {
    if (this.msalGuardConfig.authRequest) {
      this.msalService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.msalService.loginRedirect();
    }
  }

  logoutRedirect(): void {
    this.msalService.logoutRedirect();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
