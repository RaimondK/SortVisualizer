import {Component, OnInit} from '@angular/core';
import {SortingAlgorithmsService} from "../../services/sorting-algorithms/sorting-algorithms.service";
import {ChartComponent} from "../chart/chart.component";
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-bubblesort',
  standalone: true,
  imports: [
    ChartComponent
  ],
  templateUrl: './bubblesort.component.html',
  styleUrl: './bubblesort.component.scss'
})
export class BubblesortComponent implements OnInit {
  chartOptions: any;

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

  bubbleSort() {
    this.sortingService.bubbleSort(this.chartOptions.data[0].dataPoints);
  }
}
