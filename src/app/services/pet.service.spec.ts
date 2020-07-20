import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PetService } from './pet.service';
import { appState } from '../store/state';

describe('PetService', () => {
  let service: PetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, NgxsModule.forRoot(appState)],
    });
    service = TestBed.inject(PetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
