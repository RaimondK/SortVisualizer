import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
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
export class ChartComponent implements OnInit, OnDestroy, OnChanges {

  @Input() dataPoints: { y: number, color: string }[] = [];
  @Input() chartTitle: string = "Sorting algorithms"

  chart: any;

  private animationFrameId: number | null = null;

  chartOptions = {
    exportEnabled: true,
    title: {
      text: this.chartTitle,
      fontSize: 24,
    },
    responsive: true,
    animationEnabled: true,
    axisY: {
      includeZero: true,
      labelFontSize: 14,
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
    }
    if (changes['chartTitle']) {
      this.chartOptions.title.text = this.chartTitle;
    }
    if (this.chart) {
      this.chart.render();
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
}

