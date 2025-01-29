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
        y: Math.floor(Math.random() * 1000) + 1
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
}
