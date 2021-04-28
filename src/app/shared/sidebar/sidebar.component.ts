import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];

  constructor(private sidebarService: SidebarService) {
    console.log(sidebarService.menu);
    this.menuItems = sidebarService.menu;

   }

  ngOnInit() {
  }

}
