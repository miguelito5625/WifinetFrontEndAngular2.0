import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalAdministradorComponent } from './principal-administrador.component';

describe('PrincipalAdministradorComponent', () => {
  let component: PrincipalAdministradorComponent;
  let fixture: ComponentFixture<PrincipalAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
