import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() chartType: string;
  @Input() chartName: string;
  @Input() chartDataset: Array<any>;
  @Input() chartLabels: Array<string>;
  @Input() chartColors: Array<any>;
  @Input() chartOptions: any;

  constructor() { }

  ngOnInit(): void {
  }

}
