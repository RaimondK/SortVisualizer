import {Component, OnInit} from '@angular/core';
import {SortingAlgorithmsService} from "../../services/sorting-algorithms/sorting-algorithms.service";
import {ChartComponent} from "../chart/chart.component";
import {DataService} from "../../services/data/data.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-quicksort',
  standalone: true,
  imports: [
    ChartComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './quicksort.component.html',
  styleUrl: './quicksort.component.scss'
})
export class QuicksortComponent implements OnInit {

  chartOptions: any;
  columnCount: number = 100;
  chartTitle: string = "Quick sort";

  constructor(private sortingService: SortingAlgorithmsService,
              private dataService: DataService) {
    this.chartOptions = {
      data: [
        {
          type: 'column',
          color: '#6b6b6b',
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
    this.chartOptions.data[0].dataPoints = this.dataService.generateDataPoints(this.columnCount);
    this.chartOptions = { ...this.chartOptions };
  }

  quickSort() {
    this.sortingService.quickSort(this.chartOptions.data[0].dataPoints);
  }
}
