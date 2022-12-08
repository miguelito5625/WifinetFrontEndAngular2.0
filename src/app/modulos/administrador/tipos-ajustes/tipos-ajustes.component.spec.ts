import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposAjustesComponent } from './tipos-ajustes.component';

describe('TiposAjustesComponent', () => {
  let component: TiposAjustesComponent;
  let fixture: ComponentFixture<TiposAjustesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposAjustesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposAjustesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
