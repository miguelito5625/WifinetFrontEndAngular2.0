import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicocobradorComponent } from './tecnicocobrador.component';

describe('TecnicocobradorComponent', () => {
  let component: TecnicocobradorComponent;
  let fixture: ComponentFixture<TecnicocobradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnicocobradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicocobradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
