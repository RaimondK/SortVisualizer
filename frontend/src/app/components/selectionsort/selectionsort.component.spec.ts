import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionsortComponent } from './selectionsort.component';

describe('SelectionsortComponent', () => {
  let component: SelectionsortComponent;
  let fixture: ComponentFixture<SelectionsortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionsortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionsortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
