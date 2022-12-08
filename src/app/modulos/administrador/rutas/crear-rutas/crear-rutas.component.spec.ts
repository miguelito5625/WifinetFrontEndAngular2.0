import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRutasComponent } from './crear-rutas.component';

describe('CrearRutasComponent', () => {
  let component: CrearRutasComponent;
  let fixture: ComponentFixture<CrearRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearRutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
