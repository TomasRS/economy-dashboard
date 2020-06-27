import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DollarType } from './DollarType';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly ROOT_URL="https://dashboardsargentina.azurewebsites.net/api";

  title = 'webapp';
  dollarValues: Observable<DollarType[]>;

  constructor(private http: HttpClient){
    this.getDollarValues();
  }

  getDollarValues(){
    this.dollarValues = this.http.get<DollarType[]>(this.ROOT_URL + '/currency/usds' );
  }
}
