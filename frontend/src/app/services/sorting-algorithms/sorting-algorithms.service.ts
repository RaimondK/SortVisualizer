import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SortingAlgorithmsService {

  private dataSubject = new Subject<{ y: number; color: string }[]>();
  data$ = this.dataSubject.asObservable();

  quickSort(data: {y: number}[]) {
    this.qs(data, 0, data.length - 1);
  }

  qs(arr: { y: number }[], low: number, high: number) {
    if (low >= high) {
      return
    }

    const pivotIdx = this.partition(arr, low, high);

    this.qs(arr, low, pivotIdx - 1);
    this.qs(arr, pivotIdx + 1, high);
  }

  partition(arr: { y: number }[], low: number, high: number): number {
    const pivot = arr[high].y;

    let idx = low - 1;

    for (let i = low; i < high; i++) {
      if (arr[i].y <= pivot) {
        idx++;
        const tmp = arr[i].y;
        arr[i].y = arr[idx].y;
        arr[idx].y = tmp;
      }
    }

    idx++;
    const tmp = arr[high].y;
    arr[high].y = arr[idx].y;
    arr[idx].y = tmp;

    return idx;
  }

  bubbleSort(data: { y: number; color: string }[]) {
    let i = 0;
    let j = 0;
    let swapped = false;
    let delay = 100;

    const animate = () => {
      if (i < data.length - 1) {
        if (j < data.length - 1 - i) {
          if (data[j].y > data[j + 1].y) {



            const temp = data[j].y;
            data[j].y = data[j + 1].y;
            data[j + 1].y = temp;
            swapped = true;


            this.dataSubject.next([...data]);

          }
          data[j + 1].color = 'blue';
          data[j].color = '#6b6b6b';
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
