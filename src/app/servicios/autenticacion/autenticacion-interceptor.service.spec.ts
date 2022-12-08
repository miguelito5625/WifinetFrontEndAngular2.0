import { TestBed } from '@angular/core/testing';

import { AutenticacionInterceptorService } from './autenticacion-interceptor.service';

describe('AutenticacionInterceptorService', () => {
  let service: AutenticacionInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacionInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
