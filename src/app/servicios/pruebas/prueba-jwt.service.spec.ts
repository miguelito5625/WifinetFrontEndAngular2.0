import { TestBed } from '@angular/core/testing';

import { PruebaJwtService } from './prueba-jwt.service';

describe('PruebaJwtService', () => {
  let service: PruebaJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PruebaJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
