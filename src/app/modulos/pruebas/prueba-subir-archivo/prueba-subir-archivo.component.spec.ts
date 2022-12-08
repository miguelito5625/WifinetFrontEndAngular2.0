import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaSubirArchivoComponent } from './prueba-subir-archivo.component';

describe('PruebaSubirArchivoComponent', () => {
  let component: PruebaSubirArchivoComponent;
  let fixture: ComponentFixture<PruebaSubirArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaSubirArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaSubirArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
