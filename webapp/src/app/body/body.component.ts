import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DollarType } from '../models/dollartype.model';
import { CentralBank } from '../models/centralbank.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  public annualExpectedInflationValues: string[] = [];
  public annualExpectedInflationDates: string[] = [];

  @Input() usds: DollarType[];
  @Input() annualExpectedInflations: CentralBank[];
  
  public lineChart: string = 'line';

  public expectedVsInterannualInflationDataset: Array<any> = [];

  public expectedVsInterannualInflationLabels: Array<any> = this.annualExpectedInflationDates;
  public lineChartColors: Array<any> = [];

  public lineChartOptions: any = {
    responsive: true
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.annualExpectedInflationValues = changes.annualExpectedInflations.currentValue.map(dateValue => dateValue.value);
    this.annualExpectedInflationDates = changes.annualExpectedInflations.currentValue.map(dateValue => dateValue.date);
    
    this.expectedVsInterannualInflationDataset = [
    {data: this.annualExpectedInflationValues, label:'Inflacion anual esperada'},
    {data: this.annualExpectedInflationValues, label:'Inflacion interanual'}];

    this.expectedVsInterannualInflationLabels = this.annualExpectedInflationDates;
  }
}
