import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCobrosComponent } from './crear-cobros.component';

describe('CrearCobrosComponent', () => {
  let component: CrearCobrosComponent;
  let fixture: ComponentFixture<CrearCobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
