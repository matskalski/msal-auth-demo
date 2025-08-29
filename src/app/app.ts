import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from './components/shared/header/header';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    RouterLink,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('msal-auth-demo');
}
