import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearBoletasDepositoComponent } from './crear-boletas-deposito.component';

describe('CrearBoletasDepositoComponent', () => {
  let component: CrearBoletasDepositoComponent;
  let fixture: ComponentFixture<CrearBoletasDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearBoletasDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearBoletasDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
