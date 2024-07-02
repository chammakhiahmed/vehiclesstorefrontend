import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicles.service';
import { Vehicle } from 'src/app/vehicle/vehicle.module';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit { 
  vehicles: any=[];
  filteredVehicles: any[] = [];

  // constructor( private VehicleService : VehicleService) { }

  // ngOnInit(): void {
  //   this.VehicleService.getVehicles().subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.vehicles = data;
  //     }
  //   )
  // }

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const type = params['type'];
      this.getVehiclesByType(type);
    });
  }

  getVehiclesByType(type: string): void {
    this.vehicleService.getVehicles().subscribe((data: any[]) => {
      // console.log("parm :",type);
      // console.log("parm 2 :",this.vehicles.type);

      if (type) {
        this.vehicles = data.filter(vehicle => vehicle.type === type);

      } else {
        this.vehicles = data;
      }
    });
  }
}
