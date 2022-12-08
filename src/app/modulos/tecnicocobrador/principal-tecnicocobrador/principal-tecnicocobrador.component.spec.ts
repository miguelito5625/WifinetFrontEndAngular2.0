import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalTecnicocobradorComponent } from './principal-tecnicocobrador.component';

describe('PrincipalTecnicocobradorComponent', () => {
  let component: PrincipalTecnicocobradorComponent;
  let fixture: ComponentFixture<PrincipalTecnicocobradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalTecnicocobradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalTecnicocobradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
