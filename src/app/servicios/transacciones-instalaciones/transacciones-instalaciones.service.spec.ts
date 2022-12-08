import { TestBed } from '@angular/core/testing';

import { TransaccionesInstalacionesService } from './transacciones-instalaciones.service';

describe('TransaccionesInstalacionesService', () => {
  let service: TransaccionesInstalacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransaccionesInstalacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
