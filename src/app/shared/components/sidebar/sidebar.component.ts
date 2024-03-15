import { AuthenticateService } from '../../../auth/services/authenticate.service';
import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, inject } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';
import { RouterLink } from '@angular/router';
import { TokenHandlerService } from '../../../auth/services/token-handler.service';
import { User } from '../../../models/auth/user';

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
  private authService: AuthenticateService = inject(AuthenticateService);
  private gifsService:GifsService = inject(GifsService);
  @Input()
  public showHistory:boolean = true;
  public isMouseOver:boolean = false;
  public tagFocus:string = "";
  
  get tags():string[] {
    return this.gifsService.tagsHistory;
  }

  searchAgain(tag:string): void {
    this.gifsService.searchTag(tag);
  }

  logout(): void {
    this.authService.logout();
  }

  mouseOver(tag:string):void {
    this.isMouseOver = true;
    this.tagFocus = tag;
  }

  mouseLeave(): void {
    this.isMouseOver = false;
    this.tagFocus = "";
  }

  @HostListener('document:keydown', ['$event'])
  deleteSearch(event: KeyboardEvent): void {
    if(event.key === "Delete" && this.isMouseOver) {
      this.gifsService.deleteTag(this.tagFocus);
    }
  }
}
