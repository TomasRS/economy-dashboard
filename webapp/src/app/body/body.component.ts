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
  
  //Usds variables
  public mockUsd: DollarType = { name: "Cargando nombre...", buyValue: "Cargando...", sellValue: "Cargando...", imagePath:"../assets/loading-dollar-image.jpg" };
  public usds: DollarType[] = [this.mockUsd, this.mockUsd, this.mockUsd, this.mockUsd];
  public lastUpdate: string = "Cargando...";

  //Charts global variables
  public lineChart: string = 'line';
  public barChart: string = 'bar';
  public chartOptions: any = {
    responsive: true
  };

  //Inflation chart variables
  //First chart
  public annualExpectedInflationValues: string[] = [];
  public annualExpectedInflationDates: string[] = [];
  public interannualInflationValues: string[] = [];
  public interannualInflationDates: string[] = [];
  public expectedVsInterannualInflationDataset: Array<any> = [];
  public expectedVsInterannualInflationLabels: Array<any> = this.annualExpectedInflationDates;
  public lineChartColors: Array<any> = [];

  //------------------------

  //Second chart
  public inflationDifferenceValues: string[] = [];
  public inflationDifferenceDates: string[] = [];
  public inflationDifferenceDataset: Array<any> = [];
  public inflationDifferenceLabels: Array<any> = this.inflationDifferenceDates;
  public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
    }
  ];
  //------------------------

  
  

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getUsdValues();
    this.getAnnualExpectedInflation();
    this.getInterannualInflation();
    this.getDifAnnualExpectedAndInterannual();
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
      this.lastUpdate = new Date().toLocaleString().split(' ')[0];
    })
  }

  public getAnnualExpectedInflation(){
    this.dataService.getAnnualExpectedInflation().subscribe((data: any[])=>{
      let annualExpectedInflations;
      annualExpectedInflations = data;
      annualExpectedInflations = this.getLastTenRecords(annualExpectedInflations);
      this.annualExpectedInflationValues = this.mapToListOfValues(annualExpectedInflations);
      this.annualExpectedInflationDates = this.mapToListOfDates(annualExpectedInflations);
    
      this.expectedVsInterannualInflationDataset.push(
        {data: this.annualExpectedInflationValues, label:'Inflacion anual esperada'}
      );

      this.expectedVsInterannualInflationLabels = this.annualExpectedInflationDates;
    });
  }

  public getInterannualInflation(){
    this.dataService.getInterannualInflation().subscribe((data: any[])=>{
      let interannualInflations;
      interannualInflations = data;
      interannualInflations = this.getLastTenRecords(interannualInflations);
      this.interannualInflationValues = this.mapToListOfValues(interannualInflations);
      this.interannualInflationDates = this.mapToListOfDates(interannualInflations);
    
      this.expectedVsInterannualInflationDataset.push(
        {data: this.interannualInflationValues, label:'Inflacion interanual'}
      );
    });
  }

  public getDifAnnualExpectedAndInterannual(){
    this.dataService.getDifAnnualExpectedVsInterannualInflation().subscribe((data: any[])=>{
      let inflationDifference;
      inflationDifference = data;
      inflationDifference = this.getLastTenRecords(inflationDifference);
      this.inflationDifferenceValues = this.mapToListOfValues(inflationDifference);
      this.inflationDifferenceDates = this.mapToListOfDates(inflationDifference);
    
      this.inflationDifferenceDataset.push(
        {data: this.interannualInflationValues, label:'Inflacion interanual'}
      );

      this.inflationDifferenceLabels = this.inflationDifferenceDates;
    });
  }


  //Utils methods
  public getLastTenRecords(list:CentralBank[]){
    return list.slice(list.length - 10);
  }

  public mapToListOfDates(list:CentralBank[]){
    return list.map(record => record.date);
  }

  public mapToListOfValues(list:CentralBank[]){
    return list.map(record => record.value);
  }
}
