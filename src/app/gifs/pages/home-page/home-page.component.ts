import { Component, inject } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interface';

import { CardListComponent } from '../../components/card-list/card-list.component';
import { GifsCardComponent } from '../../components/gifs-card/gifs-card.component';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';

@Component({
  selector: 'gifs-home-page',
  standalone: true,
  imports: [
    CardListComponent,
    GifsCardComponent,
    SearchBoxComponent,
  ],
  templateUrl: './home-page.component.html',
  styles: ``
})
export class HomePageComponent {
  private gifsService:GifsService = inject(GifsService);

  get gifs():Gif[] {
    return this.gifsService.gifList;
  }
}
