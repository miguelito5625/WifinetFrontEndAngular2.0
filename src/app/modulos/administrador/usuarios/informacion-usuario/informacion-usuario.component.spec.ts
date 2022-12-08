import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionUsuarioComponent } from './informacion-usuario.component';

describe('InformacionUsuarioComponent', () => {
  let component: InformacionUsuarioComponent;
  let fixture: ComponentFixture<InformacionUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
