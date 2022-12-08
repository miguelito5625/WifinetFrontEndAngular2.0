import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaPrincipalComponent } from './prueba-principal.component';

describe('PruebaPrincipalComponent', () => {
  let component: PruebaPrincipalComponent;
  let fixture: ComponentFixture<PruebaPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
