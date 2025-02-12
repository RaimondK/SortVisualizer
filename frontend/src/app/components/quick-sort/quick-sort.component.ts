import {Component, OnInit} from '@angular/core';
import {SortingAlgorithmsService} from "../../services/sorting-algorithms/sorting-algorithms.service";
import {ChartComponent} from "../chart/chart.component";
import {DataService} from "../../services/data/data.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-quick-sort',
  standalone: true,
  imports: [
    ChartComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './quick-sort.component.html',
  styleUrl: './quick-sort.component.scss'
})
export class QuickSortComponent implements OnInit {

  chartOptions: any;
  columnCount: number = 100;
  chartTitle: string = "Quick sort";

  constructor(private sortingService: SortingAlgorithmsService,
              private dataService: DataService) {
    this.chartOptions = {
      data: [
        {
          dataPoints: this.dataService.generateDataPoints(this.columnCount),
        },
      ],
    };
  }

  ngOnInit(): void {
    this.sortingService.data$.subscribe((data) => {
      this.chartOptions.data[0].dataPoints = data;
    })
  }

  generateColumns() {
    if (this.columnCount <= 0) {
      this.columnCount = 2;
    } else if (this.columnCount > 500) {
      this.columnCount = 500;
    }
    this.chartOptions.data[0].dataPoints = this.dataService.generateDataPoints(this.columnCount);
    this.chartOptions = { ...this.chartOptions };
  }

  quickSort() {
    this.sortingService.quickSort(this.chartOptions.data[0].dataPoints);
  }
}
