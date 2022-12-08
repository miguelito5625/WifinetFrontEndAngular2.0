import { TestBed } from '@angular/core/testing';

import { CostoTransaccionesService } from './costo-transacciones.service';

describe('CostoTransaccionesService', () => {
  let service: CostoTransaccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostoTransaccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
