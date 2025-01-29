import {Component, OnInit} from '@angular/core';
import { CommonModule } from "@angular/common";
import {TestClass} from "./test-class";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {
  testList: TestClass[] = [
    new TestClass("Nila", "Niliene", 0),
    new TestClass("Nila1", "Niliene1", 1),
    new TestClass("Nila2", "Niliene2", 2),
    new TestClass("Nila3", "Niliene3", 3),
    new TestClass("Nila4", "Niliene4", 4),
    new TestClass("Nila5", "Niliene5", 5),
  ]
  testDataSource = this.testList;

  ngOnInit(): void {
  }
}
