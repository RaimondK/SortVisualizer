import {Component, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {NgClass, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SidebarService} from "../../services/sidebar/sidebar.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIconModule,
    NgIf,
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  isSidebarVisible = true;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.sidebarVisibility.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarService.toggleSidebar();
  }

}
