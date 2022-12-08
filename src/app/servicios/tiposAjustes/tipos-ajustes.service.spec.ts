import { TestBed } from '@angular/core/testing';

import { TiposAjustesService } from './tipos-ajustes.service';

describe('TiposAjustesService', () => {
  let service: TiposAjustesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposAjustesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
