import { Component , OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit { 
  products: any=[];

  constructor( private ApiService : ApiService) { }

  ngOnInit(): void {
    this.ApiService.getVehicles().subscribe(
      (data) => {
        console.log(data);
        this.products = data;
      }
    )
  }
}
