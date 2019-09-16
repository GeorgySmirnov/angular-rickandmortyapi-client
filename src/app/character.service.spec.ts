import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { mockCharacterList } from './mocks/character-endpoint';

describe('CharacterService', () => {
  const mockGetResult = {
    info: {
      count: 394,
      pages: 20,
      next: 'https://rickandmortyapi.com/api/character/?page=20',
      prev: 'https://rickandmortyapi.com/api/character/?page=18'
    },
    results: mockCharacterList,
  };
  const characterURL = 'https://rickandmortyapi.com/api/character/';

  const setup = () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    const service: CharacterService = TestBed.get(CharacterService);
    const http: HttpTestingController = TestBed.get(HttpTestingController);
    return { service, http };
  };

  it('should be created', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });

  it('should return character list', (done) => {
    const { service, http } = setup();
    service.getCharacters().subscribe(result => {
      expect(result).toEqual(mockCharacterList);
      done();
    });
    http.expectOne(characterURL).flush(mockGetResult);
  });
});
