import { TestBed } from '@angular/core/testing';

import { FavoriteCharactersService } from './favorite-characters.service';

describe('FavoriteCharactersService', () => {
  const setup = () => {
    TestBed.configureTestingModule({});
    const service: FavoriteCharactersService = TestBed.get(FavoriteCharactersService);
    return { service };
  };

  it('should be created', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });

  it('Empty on init', () => {
    const { service } = setup();
    expect(service.getList()).toEqual([]);
  });

  it('Allows to store favorite characters', () => {
    const { service } = setup();
    service.toggleCharacter(1);
    expect(service.getList()).toEqual([1]);
    service.toggleCharacter(3);
    service.toggleCharacter(2);
    expect(service.getList()).toEqual([1, 2, 3]);
  });

  it('Allows to remove favorites', () => {
    const { service } = setup();
    service.toggleCharacter(1);
    service.toggleCharacter(2);
    service.toggleCharacter(3);
    service.toggleCharacter(4);
    expect(service.getList()).toEqual([1, 2, 3, 4]);
    service.toggleCharacter(2);
    service.toggleCharacter(4);
    expect(service.getList()).toEqual([1, 3]);
  });
});
