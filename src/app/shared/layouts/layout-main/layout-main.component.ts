import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'shared-layout-main',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
  ],
  templateUrl: './layout-main.component.html',
})
export class LayoutMainComponent {
  showSidebar:boolean = false;
  router:ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.router.data.subscribe(data => {
      this.showSidebar = data['showSidebar'];
    });
  }
}
