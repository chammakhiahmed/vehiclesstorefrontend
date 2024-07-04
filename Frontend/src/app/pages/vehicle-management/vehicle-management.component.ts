import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../../services/vehicles.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.css']
})

export class VehicleManagementComponent implements OnInit {
  vehicles: any[] = [];
  vehicleForm: FormGroup;
  editMode: boolean = false;
  selectedVehicle: any = null;
  currentVehicleId: string | null = null;
  userName: string = ''; 
  userEmail: string = '';
  filteredVehicles: any[] = [];
  searchQuery: string = '';

  page: number = 1; // Current page number
  itemsPerPage: number = 3; // Number of items per page

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router,
  ) {
    this.vehicleForm = this.fb.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      type: ['', Validators.required],
      description: ['']  ,
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadVehicles();
 
  }

   loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe(data => {
      this.vehicles = data;
      this.filteredVehicles = data;
    });
  }

  filterVehicles(): void {
    if (this.searchQuery) {
      this.filteredVehicles = this.vehicles.filter(vehicle => vehicle.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    } else {
      this.filteredVehicles = this.vehicles;
    }
  }

  onSubmit() {
    if (this.vehicleForm.invalid) {
      return;
    }

  const vehicleData = this.vehicleForm.value;
    
  if (this.editMode && this.currentVehicleId) {
    this.vehicleService.updateVehicle(this.currentVehicleId, vehicleData).subscribe(
      response => {
        this.loadVehicles();
        this.resetForm();
      },
      error => {
        console.error('Error updating vehicle', error);
      }
    );
  } else {
    this.vehicleService.addVehicle(vehicleData).subscribe(
      response => {
        this.vehicles.push(response);
        this.resetForm();
      },
      error => {
        console.error('Error adding vehicle', error);
      }
    );
  }
}

onEdit(vehicle: any): void {
  this.editMode = true;
  this.currentVehicleId = vehicle.id;
  this.vehicleForm.patchValue(vehicle);
}

onDelete(vehicleId: string): void {
  if (confirm('Are you sure you want to delete this vehicle ?')) {
    this.vehicleService.deleteVehicle(vehicleId).subscribe(
      () => {
        this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== vehicleId);
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }
}




resetForm(): void {
  this.editMode = false;
  this.currentVehicleId = null;
  this.vehicleForm.reset();

}



}
