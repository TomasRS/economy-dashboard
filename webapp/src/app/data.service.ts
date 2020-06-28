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
    return this.httpClient.get(this.ROOT_URL + '/currency/usds')
  }
}
