import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaJwtComponent } from './prueba-jwt.component';

describe('PruebaJwtComponent', () => {
  let component: PruebaJwtComponent;
  let fixture: ComponentFixture<PruebaJwtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaJwtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaJwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
