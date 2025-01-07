import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarDetailsComponent } from './edit-car-details.component';

describe('EditCarDetailsComponent', () => {
  let component: EditCarDetailsComponent;
  let fixture: ComponentFixture<EditCarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCarDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
