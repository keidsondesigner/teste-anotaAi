import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  template: `
    <app-header></app-header>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  title = 'teste-anotaAi';

  sum(a: number, b: number): number {
    return a + b;
  }
}
