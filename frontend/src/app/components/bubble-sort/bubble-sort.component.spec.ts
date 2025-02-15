import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleSortComponent } from './bubble-sort.component';

describe('BubblesortComponent', () => {
  let component: BubbleSortComponent;
  let fixture: ComponentFixture<BubbleSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleSortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubbleSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
