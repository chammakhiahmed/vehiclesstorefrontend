import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { VehicleManagementComponent } from './pages/vehicle-management/vehicle-management.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';


const routes: Routes = [
  { path: 'home' ,component:HomeComponent},
  { path: '' ,component:HomeComponent},
  {path: 'vehicle',component:VehiclesComponent},
  {path: 'contact',component:ContactComponent},
  {path: 'about',component:AboutComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'vehiclesmanagement', component: VehicleManagementComponent  },
  { path: 'usersmanagement',component:UserManagementComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
