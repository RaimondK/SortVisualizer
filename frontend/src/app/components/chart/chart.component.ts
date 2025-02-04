import {Component, OnDestroy, OnInit} from '@angular/core';
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import {SidebarService} from "../../services/sidebar/sidebar.service";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    CanvasJSAngularChartsModule
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit, OnDestroy {

  chart: any;
  private animationFrameId: number | null = null;

  title = 'angular17ssrapp';
  chartOptions = {
    exportEnabled: true,
    title: {
      text: "Sorting algorithms"
    },
    responsive: true,
    animationEnabled: true,
    axisY: {
      includeZero: true,
    },
    axisX: {
      lineThickness: 0,
      tickThickness: 0,
      labelFormatter: function (e: string) {
        return "";
      }
    },
    data: [{
      type: "column", //change type to bar, line, area, pie, etc
      //indexLabel: "{y}", //Shows y value on all Data Points
      color: "#6b6b6b",
      backgroundColor: "#F5DEB3",
      indexLabelFontColor: "#5A5757",
      dataPoints: this.generateDataPoints(),
    }]
  }

  constructor(private sidebarService: SidebarService) {
  };

  ngOnInit(): void {
    this.sidebarService.sidebarVisibility.subscribe(() => {
      if (this.chart) {
        this.startAnimation();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  startAnimation() {
    const duration = 300;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;

      if (elapsedTime < duration) {
        this.chart.render();
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.stopAnimation();
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  stopAnimation() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  getChartInstance(chart: any) {
    this.chart = chart;
  }

  generateDataPoints() {
    const dataPoints = [];
    for (let i = 0; i < 10; i++) {
      dataPoints.push({
        y: Math.floor(Math.random() * 1000) + 1,
        color: '#6b6b6b'
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

  swapColumns() {
    const dataPoints = this.chartOptions.data[0].dataPoints;
    let delay = 0;

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
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

          dataPoints[idx1].color = 'blue';
          dataPoints[idx2].color = 'red';
          this.chart.render();

          setTimeout(() => {
            dataPoints[idx1].color = '#6b6b6b';
            dataPoints[idx2].color = '#6b6b6b';
            this.chart.render();
          }, 100);
        }, 300);
      }, delay += 600);
    }
  }

  addData() {
    let delay = 300;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.chartOptions.data[0].dataPoints.push({
          y: Math.floor(Math.random() * 1000) + 1,
          color: '#6b6b6b'
        })
        this.chart.render();
      }, i * delay);
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

  bubbleSort() {
    const data = this.chartOptions.data[0].dataPoints;
    let i = 0;
    let j = 0;
    let swapped = false;
    let delay = 100;

    const animate = () => {
      if (i < data.length - 1) {
        if (j < data.length - 1 - i) {
          if (data[j].y > data[j + 1].y) {
            const temp = data[j].y;
            data[j].y = data[j + 1].y;
            data[j + 1].y = temp;
            swapped = true;

            this.chart.render();
          }
          j++;
        } else {
          if (!swapped) {

// This is for later once I'll add colors and want
// to reset all colors of the chart in the end
/*            data.forEach(test => test.color = '#6b6b6b');
            this.chart.render();*/

            return;
          }
          i++;
          j = 0;
          swapped = false;
        }
        setTimeout(() => requestAnimationFrame(animate), delay);
      }
    };
    requestAnimationFrame(animate);
  }
}

