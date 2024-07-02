import { Component , ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicles.service';

import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit { 
  vehicles: any=[];
  filteredVehicles: any[] = [];
  selectedVehicle: any;
  dataUser: any;
  parseData: any;
  today: string = new Date().toISOString().split('T')[0]; // Initialize with today's date

  // constructor( private VehicleService : VehicleService) { }

  // ngOnInit(): void {
  //   this.VehicleService.getVehicles().subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.vehicles = data;
  //     }
  //   )
  // }

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService,  private router: Router) { }

  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const type = params['type'];
      this.getVehiclesByType(type);
    });
   

  }

  getUserName():void{
    this.dataUser =localStorage.getItem('roleUser');
    this.parseData = JSON.parse(this.dataUser!);
   
   return this.parseData[1];
  }
  getUserEmail():void{
    this.dataUser =localStorage.getItem('roleUser');
    this.parseData = JSON.parse(this.dataUser!);
   
   return this.parseData[2];
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
  @ViewChild('vehicleDetailsModal', { static: false }) vehicleDetailsModal!: ElementRef;


  openVehicleDetails(vehicle: any): void {
    this.selectedVehicle = vehicle;
    const modal = document.getElementById('vehicleDetailsModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
   
  }

  closeVehicleDetails(): void {
    this.selectedVehicle = null;
    const modal = document.getElementById('vehicleDetailsModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  openImageInFullscreen(imageUrl: string): void {
    const modal = document.getElementById('vehicleDetailsModal');
    if (modal) {
      modal.classList.remove('fade');
      modal.classList.add('show');
      const img = new Image();
      img.src = imageUrl;
      img.classList.add('modal-fullscreen');
      modal.querySelector('.modal-dialog')?.appendChild(img);
    }
  }
 
  @ViewChild('orderForm') orderForm!: NgForm;

  submitOrderForm(): void {
    // Replace with your logic to send form data (e.g., via email service)
    // Example: You can log form data or send it to an API
    console.log("Form submitted:", {
      userName: this.parseData[1],
      userEmail: this.parseData[2],
      vehicleName: this.selectedVehicle?.name,
      orderDate: this.today
    });

    // Optionally, close the modal after form submission
    document.getElementById('orderModal')?.classList.remove('show');
    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = '';
    
    window.location.reload();
  }

}
