import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SortingAlgorithmsService {

  private dataSubject = new Subject<{ y: number; color: string }[]>();
  data$ = this.dataSubject.asObservable();

  quickSort(data: { y: number; color: string }[]) {
    this.qs(data, 0, data.length - 1);
    this.dataSubject.next([...data]);
  }

  qs(data: { y: number; color: string }[], low: number, high: number) {
    if (low >= high) {
      return
    }

    const pivotIdx = this.partition(data, low, high);

    this.qs(data, low, pivotIdx - 1);
    this.qs(data, pivotIdx + 1, high);
  }

  partition(data: { y: number; color: string }[], low: number, high: number): number {
    const pivot = data[high].y;

    let idx = low - 1;

    for (let i = low; i < high; i++) {
      if (data[i].y <= pivot) {
        idx++;
        const tmp = data[i].y;
        data[i].y = data[idx].y;
        data[idx].y = tmp;
      }
    }

    idx++;
    const tmp = data[high].y;
    data[high].y = data[idx].y;
    data[idx].y = tmp;

    return idx;
  }

  bubbleSort(data: { y: number; color: string }[], delay: number = 100) {
    let i = 0;
    let j = 0;
    let swapped = false;

    const animate = () => {
      if (i < data.length - 1) {
        if (j < data.length - 1 - i) {

          data[j].color = '#6b6b6b';
          data[j + 1].color = 'green';

          if (data[j].y > data[j + 1].y) {

            const temp = data[j].y;
            data[j].y = data[j + 1].y;
            data[j + 1].y = temp;
            swapped = true;

            this.dataSubject.next([...data]);

          }
          j++;
        } else {
          if (!swapped) {
            data.forEach((point) => (point.color = '#6b6b6b'));
            this.dataSubject.next([...data]);
            return;
          }
          i++;
          j = 0;
          swapped = false;
        }
        setTimeout(() => requestAnimationFrame(animate), delay);
      }
    };
    requestAnimationFrame(animate);
  }
}
