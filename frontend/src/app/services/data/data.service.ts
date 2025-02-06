import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  generateDataPoints() {
    const dataPoints = [];
    for (let i = 0; i < 10; i++) {
      dataPoints.push({
        y: Math.floor(Math.random() * 1000) + 1,
        color: '#6b6b6b'
      });
    }
    return dataPoints;
  }
}
