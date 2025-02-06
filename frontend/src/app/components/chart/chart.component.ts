import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import {SidebarService} from "../../services/sidebar/sidebar.service";
import {animate} from "@angular/animations";
import {delay} from "rxjs";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    CanvasJSAngularChartsModule
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit, OnDestroy, OnChanges {

  @Input() dataPoints: { y: number, color: string }[] = [];

  chart: any;

  private animationFrameId: number | null = null;

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
      type: "column",
      color: "#6b6b6b",
      backgroundColor: "#F5DEB3",
      indexLabelFontColor: "#5A5757",
      dataPoints: [] as { y: number, color: string }[],
    }]
  }

  constructor(private sidebarService: SidebarService) {
  };

  ngOnInit(): void {
    this.chartOptions.data[0].dataPoints = this.dataPoints;

    this.sidebarService.sidebarVisibility.subscribe(() => {
      if (this.chart) {
        this.startAnimation();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataPoints']) {
      this.chartOptions.data[0].dataPoints = this.dataPoints;

      if (this.chart) {
        this.chart.render();
      }
    }
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

