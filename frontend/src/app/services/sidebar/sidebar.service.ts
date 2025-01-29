import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private sidebarVisibilitySetting = new BehaviorSubject(false);
  sidebarVisibility = this.sidebarVisibilitySetting.asObservable();

  constructor() { }

  toggleSidebar() {
    this.sidebarVisibilitySetting.next(!this.sidebarVisibilitySetting.value);
  }
}
