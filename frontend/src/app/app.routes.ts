import {Routes} from '@angular/router';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {QuicksortComponent} from "./components/quicksort/quicksort.component";
import {BubblesortComponent} from "./components/bubblesort/bubblesort.component";

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'quicksort',
    component: QuicksortComponent
  },
  {
    path: 'bubblesort',
    component: BubblesortComponent
  },
];
