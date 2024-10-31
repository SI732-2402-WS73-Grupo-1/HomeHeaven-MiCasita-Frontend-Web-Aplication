import { TestBed } from '@angular/core/testing';

import { EstatesImageService } from './estates-image.service';

describe('EstatesImageService', () => {
  let service: EstatesImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstatesImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
