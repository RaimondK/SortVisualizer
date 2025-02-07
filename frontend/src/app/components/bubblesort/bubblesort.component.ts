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
  delay :number = 100;

  constructor(private sortingService: SortingAlgorithmsService,
              private dataService: DataService) {
    this.chartOptions = {
      data: [
        {
          type: 'column',
          color: '#6b6b6b',
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
    this.chartOptions.data[0].dataPoints = this.dataService.generateDataPoints(this.columnCount);
    this.chartOptions = { ...this.chartOptions };
  }

  bubbleSort() {
    this.sortingService.bubbleSort(this.chartOptions.data[0].dataPoints, this.delay);
  }
}
