import {Component, OnInit} from '@angular/core';
import {SortingAlgorithmsService} from "../../services/sorting-algorithms/sorting-algorithms.service";
import {ChartComponent} from "../chart/chart.component";
import {DataService} from "../../services/data/data.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-bubblesort',
  standalone: true,
  imports: [
    ChartComponent,
    FormsModule
  ],
  templateUrl: './bubblesort.component.html',
  styleUrl: './bubblesort.component.scss'
})
export class BubblesortComponent implements OnInit {
  chartOptions: any;
  chartTitle: string = "Bubble Sort"
  columnCount: number = 100;
  private delay :number = 100;

  get visualizationDelay(): number {
    return this.delay;
  }

  set visualizationDelay(value: number) {
    if (value < 1) {
      this.delay = 1;
    } else if (value > 10000) {
      this.delay = 10000;
    } else {
      this.delay = value;
    }
  }

  constructor(private sortingService: SortingAlgorithmsService,
              private dataService: DataService) {
    this.chartOptions = {
      data: [
        {
          dataPoints: this.dataService.generateDataPoints(),
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

  bubbleSort() {
    this.sortingService.bubbleSort(this.chartOptions.data[0].dataPoints, this.visualizationDelay);
  }
}
