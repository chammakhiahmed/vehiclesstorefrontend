import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images: string[] = [
    'assets/car1.jpg',
    'assets/car2.jpg',
    'assets/car3.jpg'
  ];

}
