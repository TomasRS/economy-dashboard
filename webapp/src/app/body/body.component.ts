import { Component, OnInit } from '@angular/core';
import { DollarType } from '../models/dollartype.model';
import { CentralBank } from '../models/centralbank.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  
  mockUsd: DollarType = { name: "Cargando nombre...", buyValue: "Cargando...", sellValue: "Cargando...", imagePath:"../assets/loading-dollar-image.jpg" };
  usds: DollarType[] = [this.mockUsd, this.mockUsd, this.mockUsd, this.mockUsd];
  annualExpectedInflations: CentralBank[] = [];

  public annualExpectedInflationValues: string[] = [];
  public annualExpectedInflationDates: string[] = [];
  
  public lineChart: string = 'line';

  public expectedVsInterannualInflationDataset: Array<any> = [];

  public expectedVsInterannualInflationLabels: Array<any> = this.annualExpectedInflationDates;
  public lineChartColors: Array<any> = [];

  public lineChartOptions: any = {
    responsive: true
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getUsdValues();
    this.getAnnualExpectedInflation();
  }

  public getUsdValues(){
    this.dataService.getUsdValues().subscribe((data: any[])=>{
      this.usds = data;
      this.usds.forEach(usd => usd.buyValue = "$"+usd.buyValue);
      this.usds.forEach(usd => usd.sellValue = "$"+usd.sellValue);
      this.usds[0].imagePath = "../assets/100_dolar_bill_compressed.jpg";
      this.usds[1].imagePath = "../assets/100_dolar_blue_bill_compressed.jpg";
      this.usds[2].imagePath = "../assets/100_dolar_ccl_bill_compressed.jpg";
      this.usds[3].imagePath = "../assets/100_dolar_ccl_bill_compressed.jpg";
    })
  }

  public getAnnualExpectedInflation(){
    this.dataService.getAnnualExpectedInflation().subscribe((data: any[])=>{
      this.annualExpectedInflations = data;
      this.annualExpectedInflations = this.annualExpectedInflations.slice(this.annualExpectedInflations.length - 10);
      this.annualExpectedInflationValues = this.annualExpectedInflations.map(dateValue => dateValue.value);
      this.annualExpectedInflationDates = this.annualExpectedInflations.map(dateValue => dateValue.date);
    
      this.expectedVsInterannualInflationDataset = [
      {data: this.annualExpectedInflationValues, label:'Inflacion anual esperada'},
      {data: this.annualExpectedInflationValues, label:'Inflacion interanual'}];

      this.expectedVsInterannualInflationLabels = this.annualExpectedInflationDates;
    });
  }
}
