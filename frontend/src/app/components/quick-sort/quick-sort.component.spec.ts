import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSortComponent } from './quick-sort.component';

describe('QuicksortComponent', () => {
  let component: QuickSortComponent;
  let fixture: ComponentFixture<QuickSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickSortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
