import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppintcartComponent } from './shoppintcart.component';

describe('ShoppintcartComponent', () => {
  let component: ShoppintcartComponent;
  let fixture: ComponentFixture<ShoppintcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppintcartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppintcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
