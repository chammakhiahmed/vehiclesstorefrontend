import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit {

   map: L.Map | undefined;

  private initMap(): void {
    this.map = L.map('map', {
      center: [33.8076, 10.8463], // Example coordinates (Djerba)
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([33.8076, 10.8463]).addTo(this.map)
      .bindPopup('Our Location')
      .openPopup();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
