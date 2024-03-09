import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Gif } from '../../interfaces/gifs.interface';
import { GifsCardComponent } from '../gifs-card/gifs-card.component';

@Component({
  selector: 'gifs-card-list',
  standalone: true,
  imports: [
    CommonModule,
    GifsCardComponent,
  ],
  templateUrl: './card-list.component.html',
  styles: ``
})
export class CardListComponent {
  @Input()
  public gifList!:Gif[];
}
