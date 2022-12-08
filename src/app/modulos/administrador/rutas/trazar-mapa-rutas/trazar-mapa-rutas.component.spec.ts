import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrazarMapaRutasComponent } from './trazar-mapa-rutas.component';

describe('TrazarMapaRutasComponent', () => {
  let component: TrazarMapaRutasComponent;
  let fixture: ComponentFixture<TrazarMapaRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrazarMapaRutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrazarMapaRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
