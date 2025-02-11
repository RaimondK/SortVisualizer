import {Injectable} from '@angular/core';
import {min, Subject} from "rxjs";

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

  bubbleSort(data: { y: number; color: string }[], delay: number) {
    let i = 0;
    let j = 0;
    let swapped = false;

    const animate = () => {
      if (i < data.length - 1) {
        if (j < data.length - 1 - i) {
          data.forEach((columns) => (columns.color = '#6b6b6b'));
          data[j].color = 'green';
          data[j + 1].color = '#6b6b6b';
          this.dataSubject.next([...data]);

          setTimeout(() => {
            if (data[j].y > data[j + 1].y) {
              this.dataSubject.next([...data]);

              setTimeout(() => {
                const temp = data[j].y;
                data[j].y = data[j + 1].y;
                data[j + 1].y = temp;
                swapped = true;

                data[j].color = 'green';
                data[j + 1].color = '#6b6b6b';
                this.dataSubject.next([...data]);

                j++;
                requestAnimationFrame(animate);
              }, delay / 3);
            } else {
              j++;
              requestAnimationFrame(animate);
            }
          }, delay / 2);
        } else {
          if (!swapped) {
            data.forEach((columns) => (columns.color = 'green'));
            this.dataSubject.next([...data]);
            return;
          }
          i++;
          j = 0;
          swapped = false;
          requestAnimationFrame(animate);
        }
      }
    };
    requestAnimationFrame(animate);
  }

  selectionSort(data: ({y: number, color: string})[], delay: number) {
    for (let i = 0; i < data.length - 1; i++) {
      let minIdx = i;
        for (let j = i + 1; j < data.length; j++) {
          if (data[j] < data[minIdx]) {
            minIdx = j;
          }
        }
        let temp = data[i];
        data[i] = data[minIdx];
        data[minIdx] = temp;
    }
    this.dataSubject.next([...data]);
  }
}
