import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrazarRutasComponent } from './trazar-rutas.component';

describe('TrazarRutasComponent', () => {
  let component: TrazarRutasComponent;
  let fixture: ComponentFixture<TrazarRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrazarRutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrazarRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
