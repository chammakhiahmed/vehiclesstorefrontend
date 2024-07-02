import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { VehicleManagementComponent } from './pages/vehicle-management/vehicle-management.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { VehicleService } from './services/vehicles.service';
import { UserService } from './services/users.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ContactComponent,
    FooterComponent,
    VehiclesComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    VehicleManagementComponent,
    UserManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule  
  ],
  providers: [
    VehicleService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
