import {Routes} from '@angular/router';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {QuickSortComponent} from "./components/quick-sort/quick-sort.component";
import {BubbleSortComponent} from "./components/bubble-sort/bubble-sort.component";
import {SelectionSortComponent} from "./components/selection-sort/selection-sort.component";
import {InsertionSortComponent} from "./components/insertion-sort/insertion-sort.component";

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'quick-sort',
    component: QuickSortComponent
  },
  {
    path: 'bubble-sort',
    component: BubbleSortComponent
  },
  {
    path: 'selection-sort',
    component: SelectionSortComponent
  },
  {
    path: 'insertion-sort',
    component: InsertionSortComponent
  },
];
