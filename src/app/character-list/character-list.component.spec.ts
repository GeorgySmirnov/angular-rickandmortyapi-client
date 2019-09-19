import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListComponent } from './character-list.component';
import { CharacterService } from '../character.service';
import { of } from 'rxjs';
import { mockCharacterList } from '../mocks/character-endpoint';
import { AppRoutingModule } from '../app-routing.module';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { FavoriteCharactersService } from '../favorite-characters.service';
import { FavoriteCharactersComponent } from '../favorite-characters/favorite-characters.component';

describe('CharacterListComponent', () => {
  const CharacterServiceMock: Partial<CharacterService> = {
    getCharacters: () => of({
      characters: mockCharacterList,
      pages: 20,
    })};
  const FavoriteCharactersServiceMock: Partial<FavoriteCharactersService> = {
    getList: () => [1, 2, 3],
  };

  const setup = () => {
    TestBed.configureTestingModule({
      declarations: [ CharacterListComponent, CharacterDetailComponent, FavoriteCharactersComponent ],
      imports: [ AppRoutingModule ],
      providers:    [
        {provide: CharacterService, useValue: CharacterServiceMock },
        {provide: FavoriteCharactersService, useValue: FavoriteCharactersServiceMock },
      ]
    })
    .compileComponents();
    const fixture: ComponentFixture<CharacterListComponent> = TestBed.createComponent(CharacterListComponent);
    const component: CharacterListComponent = fixture.componentInstance;
    fixture.detectChanges();
    return { component, fixture };
  };

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should get character list on initialization', () => {
    const { component } = setup();
    expect(component.characters).toEqual(mockCharacterList);
  });

  it('should render character list', () => {
    const { fixture } = setup();
    const listElement: HTMLElement = fixture.nativeElement;
    const names: NodeListOf<Element> = listElement.querySelectorAll('.character-name');
    expect(names.length).toEqual(mockCharacterList.length);
    mockCharacterList.forEach((character, index) =>
      expect(names.item(index).textContent).toEqual(character.name));
  });

  it('can parse filter string', () => {
    const { component } = setup();
    expect(component.parseFilterString('')).toEqual({});
    expect(component.parseFilterString('name rick')).toEqual({ name: 'rick' });
    expect(component.parseFilterString('name rick sanchez')).toEqual({ name: 'rick sanchez' });
    expect(component.parseFilterString('status alive')).toEqual({ status: 'alive' });
    expect(component.parseFilterString('species human')).toEqual({ species: 'human' });
    expect(component.parseFilterString('type parasite')).toEqual({ type: 'parasite' });
    expect(component.parseFilterString('gender female')).toEqual({ gender: 'female' });
    expect(component.parseFilterString('name rick, status alive, species human, type parasite, gender female'))
      .toEqual({
        name: 'rick',
        status: 'alive',
        species: 'human',
        type: 'parasite',
        gender: 'female',
      });
  });
});
