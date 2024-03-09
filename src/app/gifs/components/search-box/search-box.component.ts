import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  standalone: true,
  imports: [],
  template: `
    <h5>Search:</h5>
    <input type="text"
      class="form-control"
      placeholder="Search Gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
      >
  `,
  styles: ``
})
export class SearchBoxComponent {
  private gifsService:GifsService = inject(GifsService);

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor() {}

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }
}
