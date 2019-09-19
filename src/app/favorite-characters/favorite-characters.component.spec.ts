import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCharactersComponent } from './favorite-characters.component';
import { CharacterService } from '../character.service';
import { of } from 'rxjs';
import { mockCharacterList } from '../mocks/character-endpoint';
import { FavoriteCharactersService } from '../favorite-characters.service';
import { Directive, Component, Input, Output, EventEmitter, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({selector: 'app-character-list-display', template: ''})
class ListDisplayMockComponent {
  @Input() characters;
  @Input() favorites;
  @Output() favoriteToggle = new EventEmitter<number>();
}

describe('FavoriteCharactersComponent', () => {
  const CharacterServiceMock: Partial<CharacterService> = {
    getCharactersByIds: () => of(mockCharacterList)
  };
  const FavoriteCharactersServiceMock: Partial<FavoriteCharactersService> = {
    getList: () => [1, 2, 3],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FavoriteCharactersComponent,
        ListDisplayMockComponent,
      ],
      providers:    [
        {provide: CharacterService, useValue: CharacterServiceMock },
        {provide: FavoriteCharactersService, useValue: FavoriteCharactersServiceMock },
      ]
    })
    .compileComponents();
  }));

  const setup = () => {
    const fixture: ComponentFixture<FavoriteCharactersComponent> = TestBed.createComponent(FavoriteCharactersComponent);
    const component: FavoriteCharactersComponent = fixture.componentInstance;
    fixture.detectChanges();
    return { component, fixture };
  };

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should pass parameters to character list display', () => {
    const { fixture } = setup();
    const listElements: DebugElement[] = fixture.debugElement.queryAll(By.css('app-character-list-display'));
    expect(listElements.length).toEqual(1);
    expect(listElements[0].componentInstance.characters).toEqual(mockCharacterList);
    expect(listElements[0].componentInstance.favorites).toEqual([1, 2, 3]);
  });
});
