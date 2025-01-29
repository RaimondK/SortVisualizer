import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../layout/header/header.component";
import {SidebarComponent} from "../../layout/sidebar/sidebar.component";
import {FooterComponent} from "../../layout/footer/footer.component";
import {NgClass} from "@angular/common";
import {TestComponent} from "../../test/test.component";
import {SidebarService} from "../../services/sidebar/sidebar.service";
import {ChartComponent} from "../chart/chart.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    NgClass,
    TestComponent,
    ChartComponent
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
