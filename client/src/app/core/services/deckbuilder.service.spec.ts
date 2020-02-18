import { TestBed } from '@angular/core/testing';

import { DeckbuilderService } from './deckbuilder.service';

describe('DeckbuilderService', () => {
  let service: DeckbuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckbuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
