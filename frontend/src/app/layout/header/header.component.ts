import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {SidebarService} from "../../services/sidebar/sidebar.service";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

}
