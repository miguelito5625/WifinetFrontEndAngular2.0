import { TestBed } from '@angular/core/testing';

import { BoletaDepositoService } from './boleta-deposito.service';

describe('BoletaDepositoService', () => {
  let service: BoletaDepositoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoletaDepositoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
