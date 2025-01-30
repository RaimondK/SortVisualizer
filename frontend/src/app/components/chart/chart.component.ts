import {Component} from '@angular/core';
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    CanvasJSAngularChartsModule
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {

  chart: any;

  title = 'angular17ssrapp';
  chartOptions = {
    exportEnabled: true,
    title: {
      text: "Testing canvasjs charts"
    },
    animationEnabled: true,
    axisY: {
      includeZero: true
    },
    data: [{
      type: "column", //change type to bar, line, area, pie, etc
      //indexLabel: "{y}", //Shows y value on all Data Points
      color: 'green',
      backgroundColor: "#F5DEB3",
      indexLabelFontColor: "#5A5757",
      dataPoints: this.generateDataPoints(),
    }]
  }

  generateDataPoints() {
    const dataPoints = [];
    for (let i = 0; i < 15; i++) {
      dataPoints.push({
        y: Math.floor(Math.random() * 1000) + 1,
        color: 'green'
      });
    }
    return dataPoints;
  }

  updateChart() {
    this.chartOptions.data[0].dataPoints = this.generateDataPoints();

    this.chartOptions.animationEnabled = true;

    if (this.chart) {
      this.chart.render();
    }
  }

  getChartInstance(chart: any) {
    this.chart = chart;
  }

  swapColumns() {
    const dataPoints = this.chartOptions.data[0].dataPoints;

    let idx1 = Math.floor(Math.random() * dataPoints.length);
    let idx2 = Math.floor(Math.random() * dataPoints.length);

    while (idx1 === idx2) {
      idx2 = Math.floor(Math.random() * dataPoints.length);
    }

    dataPoints[idx1].color = 'red';
    dataPoints[idx2].color = 'blue';

    this.chart.render();

    setTimeout(() => {
      const tmp = dataPoints[idx1].y;
      dataPoints[idx1].y = dataPoints[idx2].y;
      dataPoints[idx2].y = tmp;

      dataPoints[idx1].color = 'green';
      dataPoints[idx2].color = 'green';
      this.chart.render();
    }, 500);
  }



  addData() {
    let count = 0;
    const interval = setInterval(() => {
      if (count < 5) {
        this.chartOptions.data[0].dataPoints.push({
          y: Math.floor(Math.random() * 1000) + 1,
          color: 'yellow'
        });
        this.chart.render();
        count++;
      } else {
        clearInterval(interval);
      }
    }, 500);
  }
}



/*  Will use this later maybe for swapping
    qs(arr: { y: number }[], low: number, high: number) {
    if (low >= high) {
      return
    }

    const pivotIdx = this.partition(arr, low, high);

    this.qs(arr, low, pivotIdx - 1);
    this.qs(arr, pivotIdx + 1, high);
  }

  partition(arr: { y: number }[], low: number, high: number): number {
    const pivot = arr[high].y;

    let idx = low - 1;

    for (let i = low; i < high; i++) {
      if (arr[i].y <= pivot) {
        idx++;
        const tmp = arr[i];
        arr[i] = arr[idx];
        arr[idx] = tmp;
      }
    }

    idx++;
    const tmp = arr[high];
    arr[high] = arr[idx];
    arr[idx] = tmp;

    return idx;
  }*/
