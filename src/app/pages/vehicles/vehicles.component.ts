import { Component , OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicles.service';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit { 
  products: any=[];

  constructor( private VehicleService : VehicleService) { }

  ngOnInit(): void {
    this.VehicleService.getVehicles().subscribe(
      (data) => {
        console.log(data);
        this.products = data;
      }
    )
  }
}
