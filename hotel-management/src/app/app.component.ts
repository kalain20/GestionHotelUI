import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuGaucheComponent } from './shared/component/menu/menu-gauche.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuGaucheComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  
}
