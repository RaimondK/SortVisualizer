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
      text: "Sorting algorithms"
    },
    animationEnabled: true,
    axisY: {
      includeZero: true
    },
    data: [{
      type: "column", //change type to bar, line, area, pie, etc
      //indexLabel: "{y}", //Shows y value on all Data Points
      color: "green",
      backgroundColor: "#F5DEB3",
      indexLabelFontColor: "#5A5757",
      dataPoints: this.generateDataPoints(),
    }]
  }

  generateDataPoints() {
    const dataPoints = [];
    for (let i = 0; i < 100; i++) {
      dataPoints.push({
        y: Math.floor(Math.random() * 1000) + 1,
        color: 'green'
      });
    }
    return dataPoints;
  }

// This generates the columns in an "animated" way,
// but it's a bit too much, might use it later.

  /*  generateDataPoints() {
      const dataPoints: { y: number; color: string; }[] = [];
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          dataPoints.push({
            y: Math.floor(Math.random() * 1000) + 1,
            color: 'green'
          });
          console.log("Adding data points")
          this.chart.render();
        }, i * 50)
      }
      return dataPoints;
    }*/

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

    for (let i = 0; i < 5; i++) {

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
      }, i * 500);
    }
  }

  addData() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.chartOptions.data[0].dataPoints.push({
          y: Math.floor(Math.random() * 1000) + 1,
          color: 'purple'
        })
        this.chart.render();
      }, i * 500);
    }
  }

  quickSort() {
    const data = this.chartOptions.data[0].dataPoints;
    this.qs(data, 0, data.length - 1);
    this.chart.render();
  }

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
        const tmp = arr[i].y;
        arr[i].y = arr[idx].y;
        arr[idx].y = tmp;
      }
    }

    idx++;
    const tmp = arr[high].y;
    arr[high].y = arr[idx].y;
    arr[idx].y = tmp;

    return idx;
  }
}

