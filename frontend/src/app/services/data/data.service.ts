import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  generateDataPoints(size: number = 100): { y: number; color: string }[] {
    return Array.from({ length: size }, () => ({
      y: Math.floor(Math.random() * 1000) + 1,
      color: '#6b6b6b',
    }));
  }
}
