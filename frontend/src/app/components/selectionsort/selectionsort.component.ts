import {Component, OnInit} from '@angular/core';
import {SortingAlgorithmsService} from "../../services/sorting-algorithms/sorting-algorithms.service";
import {DataService} from "../../services/data/data.service";
import {ChartComponent} from "../chart/chart.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-selectionsort',
  standalone: true,
  imports: [
    ChartComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './selectionsort.component.html',
  styleUrl: './selectionsort.component.scss'
})
export class SelectionsortComponent implements OnInit {

  chartOptions: any;
  chartTitle: string = "Selection sort"
  columnCount: number = 100;
  private delay: number = 100;

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
    this.chartOptions = {...this.chartOptions};
  }

  selectionSort() {
    this.sortingService.selectionSort(this.chartOptions.data[0].dataPoints, this.visualizationDelay);
  }

}
