import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { mockCharacterList } from './mocks/character-endpoint';
import { CharacterFilter } from './types/character';

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

  it('can fetch single character', (done) => {
    const { service, http } = setup();
    service.getCharacter(0).subscribe(result => {
      expect(result).toEqual(mockCharacterList[0]);
      done();
    });
    http.expectOne(characterURL + '0').flush(mockCharacterList[0]);
  });

  xit('can filter characters', () => {
    const { service, http } = setup();
    const filter: CharacterFilter = {
      name: 'filter name',
      gender: 'female',
      species: 'filter species',
      status: 'alive',
      type: 'filter type',
    };
    const filterParams = 'name=filter%20name&gender=female&species=filter%20species&status=alive&type=filter%20type';
    service.getCharacters(filter);
    http.expectOne(characterURL + '?' + filterParams);
  });
});
