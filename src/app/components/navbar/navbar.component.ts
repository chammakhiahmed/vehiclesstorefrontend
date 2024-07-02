import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
roleUser = localStorage.getItem('roleUser');
showBtn = this.roleUser? true : false
showLists= this.roleUser === `"admin"`? true : false;

  constructor(private Router : Router){}

  refreshPage() {
    window.location.reload();
  }
  resetForm(){
    localStorage.removeItem('roleUser');
    this.refreshPage(); 
    };
    

}
