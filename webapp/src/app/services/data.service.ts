import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private readonly ROOT_URL="https://dashboardsargentina.azurewebsites.net/api";
  private readonly LOCALHOST="http://localhost:7071/api";
  
  constructor(private httpClient: HttpClient) { }

  public getUsdValues(){
    return this.httpClient.get(this.ROOT_URL + '/currency/usds');
  }

  public getAnnualExpectedInflation(){
    return this.httpClient.get(this.LOCALHOST + '/inflation/annualexpected');
  }

  public getInterannualInflation(){
    return this.httpClient.get(this.LOCALHOST + '/inflation/interannual');
  }

  public getDifAnnualExpectedVsInterannualInflation(){
    return this.httpClient.get(this.LOCALHOST + '/inflation/interannualvsexpected');
  }

  public getCashInFinancialEntities(){
    return this.httpClient.get(this.LOCALHOST + '/currency/cashinfinancialentities');
  }

  public getMonetaryBase(){
    return this.httpClient.get(this.LOCALHOST + '/currency/monetarybase');
  }

  public getCurrencyInCirculation(){
    return this.httpClient.get(this.LOCALHOST + '/currency/circulation');
  }
}
