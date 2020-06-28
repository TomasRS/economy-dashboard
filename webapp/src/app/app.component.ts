import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { DollarType} from './DollarType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  mockUsd: DollarType = { name: "Cargando nombre...", buyValue: "Cargando...", sellValue: "Cargando...", imagePath:"../assets/loading-dollar-image.jpg" };
  usds: DollarType[] = [this.mockUsd, this.mockUsd, this.mockUsd, this.mockUsd];
  
  title = 'webapp';

  constructor(private dataService: DataService){
    
  }

  ngOnInit(){
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

}
