import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

export class LineChart {
    lineChartData: ChartDataSets[] = []
    lineChartLabels: Label[] = [];
    lineChartOptions = {}
    lineChartColors: Color[] = []
    lineChartLegend = true
    lineChartType = ''
    lineChartPlugins = []
    annotation: {}

    constructor() {
      this.lineChartData = []
      this.lineChartLabels = []
      this.lineChartOptions = { responsive: true, }
      this.lineChartColors = []
      this.lineChartLegend = true
      this.lineChartType = 'line'
      this.lineChartPlugins = []
    }
}
