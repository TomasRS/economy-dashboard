import { Component, OnInit, Input } from '@angular/core';
import { DollarType } from '../DollarType';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  @Input() usds: DollarType[];
  
  public lineChart: string = 'line';
  public lineChartDataset: Array<any> = [
    {data: [50, 40, 60, 51, 56, 55, 40], label:'Prueba'}
  ];
  public lineChartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  public lineChartColors: Array<any> = []

  public lineChartOptions: any = {
    responsive: true
  };

  constructor() { }

  ngOnInit(): void {
  }

}
