import { Component, OnInit, OnDestroy } from '@angular/core';
import { DollarType } from '../models/dollartype.model';
import { CentralBank } from '../models/centralbank.model';
import { DataService } from '../services/data.service';
import { forkJoin, Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  fetchingData = true;
  usdsSubscription: Subscription;
  annualInflationSubscription: Subscription;
  interannualInflationSubscription: Subscription;
  diffInflationSubscription: Subscription;
  monetaryBaseSubscription: Subscription;
  forkSubscription: Subscription;

  //Usds variables
  public mockUsd: DollarType = { name: "Cargando nombre...", buyValue: "Cargando...", sellValue: "Cargando...", imagePath:"../assets/loading-dollar-image-jpg.jpg" };
  public usds: DollarType[] = [this.mockUsd, this.mockUsd, this.mockUsd, this.mockUsd];
  public usdLastUpdate: string = "Cargando...";

  //Charts global variables
  public lineChart: string = 'line';
  public barChart: string = 'bar';
  public baseChartValues: string[] = ['1','1','1','1','1','1','1','1','1','1'];
  public baseChartDates: string[] = ['1','1','1','1','1','1','1','1','1','1'];
  public chartOptions: any = {
    responsive: true
  };

  //Inflation chart variables
  //First chart
  public annualExpectedInflationValues: string[] = this.baseChartValues;
  public annualExpectedInflationDates: string[] = this.baseChartDates;
  public interannualInflationValues: string[] = this.baseChartValues;
  public interannualInflationDates: string[] = this.baseChartDates;
  public expectedVsInterannualInflationDataset: Array<any> = [{data: this.interannualInflationValues, label:'Inflacion interanual'}];
  public expectedVsInterannualInflationLabels: Array<any> = this.annualExpectedInflationDates;
  public expectedVsInterannualChartColors: Array<any> = [];

  //------------------------

  //Second chart
  public inflationDifferenceValues: string[] = this.baseChartValues;
  public inflationDifferenceDates: string[] = this.baseChartDates;
  public inflationDifferenceDataset: Array<any> = [{data: this.inflationDifferenceValues, label:'Inflacion interanual'}];
  public inflationDifferenceLabels: Array<any> = this.inflationDifferenceDates;
  public inflationDifferenceChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
    }
  ];
  //------------------------

  //Third chart
  public monetaryBaseValues: string[] = this.baseChartValues;
  public monetaryBaseDates: string[] = this.baseChartDates;
  public monetaryBaseDataset: Array<any> = [{data: this.monetaryBaseValues, label:'Base monetaria'}];
  public monetaryBaseLabels: Array<any> = this.monetaryBaseDates;
  public monetaryBaseChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(245, 152, 29, 0.75)',
      borderColor: 'rgba(245, 152, 29, 1)',
      borderWidth: 2,
    }
  ];

  //------------------------

  //Fourth chart
  public currencyCirculationValues: string[] = this.baseChartValues;
  public currencyCirculationValuesDates: string[] = this.baseChartDates;
  public currencyCirculationValuesDataset: Array<any> = [{data: this.currencyCirculationValues, label:'Circulacion monetaria'}];
  public currencyCirculationValuesLabels: Array<any> = this.currencyCirculationValuesDates;
  public currencyCirculationValuesChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0, 112, 9, 0.5)',
      borderColor: 'rgba(0, 112, 9, 1)',
      borderWidth: 2,
    }
  ];
  
  

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    let usdsObservable = this.getUsdValues();
    let annualInflationObservable = this.getAnnualExpectedInflation();
    let interannualInflationObservable = this.getInterannualInflation();
    let diffInflationObservable = this.getDifAnnualExpectedAndInterannual();
    let monetaryBaseObservable = this.getMonetaryBase();

    this.forkSubscription = forkJoin([usdsObservable, annualInflationObservable, interannualInflationObservable, diffInflationObservable, monetaryBaseObservable]).subscribe(_ => {
      //All calls have finished
      this.fetchingData = false;
    })
  }

  //Methods consumig http service
  private getUsdValues(){
    const usdsObservable = this.dataService.getUsdValues().pipe(shareReplay());
    this.usdsSubscription = usdsObservable.subscribe((data: any[]) => {
      this.usds = data;
      this.parseUsds();
      this.usdLastUpdate = new Date().toLocaleDateString().split(' ')[0];
    });
    return usdsObservable;
  }

  private getAnnualExpectedInflation(){
    const annualExpectedInflationObservable = this.dataService.getUsdValues().pipe(shareReplay());
    annualExpectedInflationObservable.subscribe((data: any[]) => {
      data = this.getLastTenRecords(data);
      this.annualExpectedInflationValues = this.mapToListOfValues(data);
      this.annualExpectedInflationDates = this.mapToListOfDates(data);
      this.expectedVsInterannualInflationDataset.push(
        {data: this.annualExpectedInflationValues, label:'Inflacion anual esperada'}
      );

      this.expectedVsInterannualInflationLabels = this.annualExpectedInflationDates;
    });
    return annualExpectedInflationObservable;
  }

  private getInterannualInflation(){
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

  private getDifAnnualExpectedAndInterannual(){
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

  private getMonetaryBase(){
    const monetaryBaseObservable = this.dataService.getUsdValues().pipe(shareReplay());
    monetaryBaseObservable.subscribe((data: any[]) => {
      this.usds = data;
      this.parseUsds();
      this.usdLastUpdate = new Date().toLocaleDateString().split(' ')[0];
    });
    return monetaryBaseObservable;
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
    this.usdsSubscription.unsubscribe();
    this.annualInflationSubscription.unsubscribe();
    this.interannualInflationSubscription.unsubscribe();
    this.diffInflationSubscription.unsubscribe();
    this.monetaryBaseSubscription.unsubscribe();
    this.forkSubscription.unsubscribe();
  }
}
