import {Routes} from '@angular/router';
import {ChartComponent} from "./components/chart/chart.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'quicksort',
    component: ChartComponent
  },
];
