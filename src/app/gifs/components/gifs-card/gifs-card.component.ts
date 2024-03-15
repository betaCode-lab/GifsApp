import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';
import { LazyImageComponent } from '../../../shared/components/lazy-image/lazy-image.component';

@Component({
  selector: 'gifs-card',
  standalone: true,
  imports: [
    LazyImageComponent
  ],
  templateUrl: './gifs-card.component.html',
  styleUrl: './gifs-card.component.css'
})
export class GifsCardComponent {
  @Input()
  public gif!:Gif;

  ngOnInit(): void {
    if( !this.gif ) throw new Error('Gif property is required');
  }
}
