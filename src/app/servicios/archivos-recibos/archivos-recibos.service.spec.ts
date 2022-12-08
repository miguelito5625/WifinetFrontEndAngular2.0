import { TestBed } from '@angular/core/testing';

import { ArchivosRecibosService } from './archivos-recibos.service';

describe('ArchivosRecibosService', () => {
  let service: ArchivosRecibosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivosRecibosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
