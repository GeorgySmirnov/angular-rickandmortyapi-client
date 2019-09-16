import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CharacterService', () => {
  const mockCharacterList =  [
    {
      id: 361,
      name: 'Toxic Rick',
      status: 'Dead',
      species: 'Humanoid',
      type: 'Rick\'s Toxic Side',
      gender: 'Male',
      origin: {
        name: 'Alien Spa',
        url: 'https://rickandmortyapi.com/api/location/64'
      },
      location: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/20'
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/361.jpeg',
      episode: [
        'https://rickandmortyapi.com/api/episode/27'
      ],
      url: 'https://rickandmortyapi.com/api/character/361',
      created: '2018-01-10T18:20:41.703Z'
    },
    {
      id: 362,
      name: 'Traflorkian',
      status: 'Alive',
      species: 'Alien',
      type: 'Traflorkian',
      gender: 'unknown',
      origin: {
          name: 'unknown',
          url: ''
      },
      location: {
          name: 'Worldender\'s lair',
          url: 'https://rickandmortyapi.com/api/location/4'
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/362.jpeg',
      episode: [
          'https://rickandmortyapi.com/api/episode/11',
          'https://rickandmortyapi.com/api/episode/13',
          'https://rickandmortyapi.com/api/episode/19',
          'https://rickandmortyapi.com/api/episode/21',
          'https://rickandmortyapi.com/api/episode/25'
      ],
      url: 'https://rickandmortyapi.com/api/character/362',
      created: '2018-01-10T18:52:08.927Z'
  },
  {
      id: 363,
      name: 'Trandor',
      status: 'Alive',
      species: 'Alien',
      type: 'Krootabulan',
      gender: 'Male',
      origin: {
          name: 'Krootabulon',
          url: 'https://rickandmortyapi.com/api/location/45'
      },
      location: {
          name: 'Earth (Replacement Dimension)',
          url: 'https://rickandmortyapi.com/api/location/20'
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/363.jpeg',
      episode: [
          'https://rickandmortyapi.com/api/episode/30'
      ],
      url: 'https://rickandmortyapi.com/api/character/363',
      created: '2018-01-10T18:54:36.578Z'
  },
// ...
  ];
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

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: CharacterService = TestBed.get(CharacterService);
    expect(service).toBeTruthy();
  });

  it('should return character list', (done) => {
    const service: CharacterService = TestBed.get(CharacterService);
    const http: HttpTestingController = TestBed.get(HttpTestingController);
    service.getCharacters().subscribe(result => {
      expect(result).toEqual(mockCharacterList);
      done();
    });
    http.expectOne(characterURL).flush(mockGetResult);
  });
});
