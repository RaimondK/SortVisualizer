import {Component, OnInit} from '@angular/core';
import {ChartComponent} from "../chart/chart.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SortingAlgorithmsService} from "../../services/sorting-algorithms/sorting-algorithms.service";
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-insertion-sort',
  standalone: true,
  imports: [
    ChartComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './insertion-sort.component.html',
  styleUrl: './insertion-sort.component.scss'
})
export class InsertionSortComponent implements OnInit {

  chartOptions: any;
  chartTitle: string = 'Insertion Sort';
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

  insertionSort() {
    this.sortingService.insertionSort(this.chartOptions.data[0].dataPoints, this.visualizationDelay);
  }
}
