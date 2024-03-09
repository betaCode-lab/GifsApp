import { Component, inject } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styles: `
    #sidebar {
      height: 100vmax;
      width: 250px;
    }
  `
})
export class SidebarComponent {
  private gifsService:GifsService = inject(GifsService)
  
  get tags():string[] {
    return this.gifsService.tagsHistory;
  }

  searchAgain(tag:string): void {
    this.gifsService.searchTag(tag);
  }
}
