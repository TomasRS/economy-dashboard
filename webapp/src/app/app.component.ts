import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { DollarType} from './DollarType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  usds: DollarType[];
  title = 'webapp';

  constructor(private dataService: DataService){
  
  }

  ngOnInit(){
    this.dataService.getUsdValues().subscribe((data: any[])=>{
      this.usds = data;
    })
  }

}
