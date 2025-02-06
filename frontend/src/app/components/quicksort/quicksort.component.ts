import {Component, OnInit} from '@angular/core';
import {SortingAlgorithmsService} from "../../services/sorting-algorithms/sorting-algorithms.service";
import {ChartComponent} from "../chart/chart.component";
import {DataService} from "../../services/data/data.service";

@Component({
  selector: 'app-quicksort',
  standalone: true,
  imports: [
    ChartComponent
  ],
  templateUrl: './quicksort.component.html',
  styleUrl: './quicksort.component.scss'
})
export class QuicksortComponent implements OnInit {

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
  }

  quickSort() {
    this.sortingService.quickSort(this.chartOptions.data[0].dataPoints);
  }
}
