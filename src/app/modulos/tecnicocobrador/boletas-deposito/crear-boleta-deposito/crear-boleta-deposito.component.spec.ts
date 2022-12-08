import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearBoletaDepositoComponent } from './crear-boleta-deposito.component';

describe('CrearBoletaDepositoComponent', () => {
  let component: CrearBoletaDepositoComponent;
  let fixture: ComponentFixture<CrearBoletaDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearBoletaDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearBoletaDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
