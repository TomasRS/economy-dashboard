import { Component, OnInit, OnDestroy } from '@angular/core';
import { DollarType } from '../models/dollartype.model';
import { CentralBank } from '../models/centralbank.model';
import { DataService } from '../services/data.service';
import { forkJoin, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  fetchingData = true;
  dashboardSubscription: Subscription;

  //Usds variables
  public mockUsd: DollarType = { name: "Cargando nombre...", buyValue: "Cargando...", sellValue: "Cargando...", imagePath:"../assets/loading-dollar-image-jpg.jpg" };
  public usds: DollarType[] = [this.mockUsd, this.mockUsd, this.mockUsd, this.mockUsd];
  public usdLastUpdate: string = "Cargando...";

  //Charts global variables
  public lineChart: string = 'line';
  public barChart: string = 'bar';
  public chartOptions: any = {
    responsive: true
  };

  //Inflation chart variables
  //First chart
  public expectedVsInterannualInflationDataset: Array<any> = [];
  public expectedVsInterannualInflationLabels: Array<any> = [];
  public expectedVsInterannualChartColors: Array<any> = [];

  //------------------------

  //Second chart
  public inflationDifferenceDataset: Array<any> = [];
  public inflationDifferenceLabels: Array<any> = [];
  public inflationDifferenceChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
    }
  ];
  //------------------------

  //Third chart
  public monetaryBaseDataset: Array<any> = [];
  public monetaryBaseLabels: Array<any> = [];
  public monetaryBaseChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(245, 152, 29, 0.75)',
      borderColor: 'rgba(245, 152, 29, 1)',
      borderWidth: 2,
    }
  ];

  //------------------------

  //Fourth chart
  public currencyCirculationDataset: Array<any> = [];
  public currencyCirculationLabels: Array<any> = [];
  public currencyCirculationChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0, 112, 9, 0.5)',
      borderColor: 'rgba(0, 112, 9, 1)',
      borderWidth: 2,
    }
  ];
  
  

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dashboardSubscription = this.getData().subscribe(
      res => {
        this.handleUsds(res[0]);
        this.handleDoubleChart(res[1], res[2], this.expectedVsInterannualInflationDataset, this.expectedVsInterannualInflationLabels, 'Inflación anual esperada', 'Inflación interanual');
        this.handleSingleChart(res[3], this.inflationDifferenceDataset, this.inflationDifferenceLabels, 'Diferencia');
        this.handleSingleChart(res[4], this.monetaryBaseDataset, this.monetaryBaseLabels, 'Base monetaria');
        this.handleSingleChart(res[5], this.currencyCirculationDataset, this.currencyCirculationLabels, 'Circulación monetaria');
        this.fetchingData = false;
      },
      err => {
        console.log(err);
        this.fetchingData = false;
      }
    );
  }

  private getData(): Observable<any> {
    const usds = this.dataService.getUsdValues();
    const annualInflation = this.dataService.getAnnualExpectedInflation();
    const interannualInflation = this.dataService.getInterannualInflation();
    const diffAnnualVsInterannual = this.dataService.getDifAnnualExpectedVsInterannualInflation();
    const monetaryBase = this.dataService.getMonetaryBase();
    const currencyCirculation = this.dataService.getCurrencyInCirculation();
    return forkJoin([usds, annualInflation, interannualInflation, diffAnnualVsInterannual, monetaryBase, currencyCirculation]);
  }

  //Handle methods (from HTTP response to data displayed)
  private handleUsds(data){
    this.usds = data;
    this.parseUsds();
    this.usdLastUpdate = new Date().toLocaleDateString().split(' ')[0];
  }

  private handleDoubleChart(apiResponseList1, apiResponseList2, dataset, labelList, labelName1, labelName2){
    apiResponseList1 = this.getLastTenRecords(apiResponseList1);
    apiResponseList2 = this.getLastTenRecords(apiResponseList2);
    let valuesFromList1 = this.mapToListOfValues(apiResponseList1);
    let valuesFromList2 = this.mapToListOfValues(apiResponseList2);
    let dates = this.mapToListOfDates(apiResponseList1);
    dataset.push({data: valuesFromList1, label: labelName1});
    dataset.push({data: valuesFromList2, label: labelName2});
    dates.forEach(date => labelList.push(date));
  }

  private handleSingleChart(apiResponseList, dataset, labelList, labelName){
    apiResponseList = this.getLastTenRecords(apiResponseList);
    let values = this.mapToListOfValues(apiResponseList);
    let dates = this.mapToListOfDates(apiResponseList);
    dataset.push({data: values, label: labelName});
    dates.forEach(date => labelList.push(date));
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

  private parseUsds(){
    this.usds.forEach(usd => usd.buyValue = "$"+usd.buyValue);
    this.usds.forEach(usd => usd.sellValue = "$"+usd.sellValue);
    this.usds[0].imagePath = "../assets/100_dolar_bill_compressed.jpg";
    this.usds[1].imagePath = "../assets/100_dolar_blue_bill_compressed.jpg";
    this.usds[2].imagePath = "../assets/100_dolar_ccl_bill_compressed.jpg";
    this.usds[3].imagePath = "../assets/100_dolar_ccl_bill_compressed.jpg";
  }

  ngOnDestroy(): void {
    this.dashboardSubscription.unsubscribe();
  }
}
