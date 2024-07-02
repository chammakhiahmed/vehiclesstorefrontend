import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
dataUser =localStorage.getItem('roleUser');
parseData = JSON.parse(this.dataUser!);
showBtn = this.parseData? true : false
showLists=this.parseData && this.parseData[0] === "admin"? true : false;

  constructor(private Router : Router){}

  refreshPage() {
    window.location.reload();
  }
  resetForm(){
    localStorage.removeItem('roleUser');
    this.refreshPage(); 
    };
    

}
