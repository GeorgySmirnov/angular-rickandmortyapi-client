import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListComponent } from './character-list.component';
import { CharacterService } from '../character.service';
import { of } from 'rxjs';
import { mockCharacterList } from '../mocks/character-endpoint';
import { AppRoutingModule } from '../app-routing.module';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { FavoriteCharactersService } from '../favorite-characters.service';
import { FavoriteCharactersComponent } from '../favorite-characters/favorite-characters.component';
import { Directive, Component, Input, Output, EventEmitter, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({selector: 'app-character-list-display', template: ''})
class ListDisplayMockComponent {
  @Input() characters;
  @Input() favorites;
  @Output() favoriteToggle = new EventEmitter<number>();
}

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
      declarations: [
        CharacterListComponent,
        ListDisplayMockComponent,
      ],
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

  it('should pass parameters to character list display', () => {
    const { fixture } = setup();
    const listElements: DebugElement[] = fixture.debugElement.queryAll(By.css('app-character-list-display'));
    expect(listElements.length).toEqual(1);
    expect(listElements[0].componentInstance.characters).toEqual(mockCharacterList);
    expect(listElements[0].componentInstance.favorites).toEqual([1, 2, 3]);
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
