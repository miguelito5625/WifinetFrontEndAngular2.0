import { TestBed } from '@angular/core/testing';

import { PruebasDatatableService } from './pruebas-datatable.service';

describe('PruebasDatatableService', () => {
  let service: PruebasDatatableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PruebasDatatableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
