import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutMainComponent } from './shared/layouts/layout-main/layout-main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LayoutMainComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gifs App';
}
