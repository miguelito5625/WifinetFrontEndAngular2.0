import { TestBed } from '@angular/core/testing';

import { GuardTecnicocobradorGuard } from './guard-tecnicocobrador.guard';

describe('GuardTecnicocobradorGuard', () => {
  let guard: GuardTecnicocobradorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardTecnicocobradorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
