import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { DollarType} from './models/dollartype.model';
import { CentralBank } from './models/centralbank.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  mockUsd: DollarType = { name: "Cargando nombre...", buyValue: "Cargando...", sellValue: "Cargando...", imagePath:"../assets/loading-dollar-image.jpg" };
  usds: DollarType[] = [this.mockUsd, this.mockUsd, this.mockUsd, this.mockUsd];
  annualExpectedInflations: CentralBank[] = [];
  
  title = 'webapp';

  constructor(private dataService: DataService){
    
  }

  ngOnInit(){
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
    })
  }

}
