import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Auth } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule, 
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  authService : Auth = inject(Auth)

  get isUserLogedIn(){
    return this.authService.isLogedIn()
  }

  login(){
    console.log('login')
    this.authService.login()
  }

  logout(){
    console.log('logout')
    this.authService.logout();
  }
}
