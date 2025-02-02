import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {FooterComponent} from "../footer/footer.component";
import {NgClass} from "@angular/common";
import {TestComponent} from "../../test/test.component";
import {SidebarService} from "../../services/sidebar/sidebar.service";
import {ChartComponent} from "../../components/chart/chart.component";
import {WelcomeComponent} from "../../components/welcome/welcome.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    NgClass,
    TestComponent,
    ChartComponent,
    WelcomeComponent,
    RouterOutlet
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  isSidebarVisible = true;
  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.sidebarVisibility.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    })
  }
}
