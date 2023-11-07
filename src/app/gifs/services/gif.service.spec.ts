import { GifService } from './gif.service';
import { TestBed } from '@angular/core/testing';

describe('GifService', () => {
  let service: GifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
