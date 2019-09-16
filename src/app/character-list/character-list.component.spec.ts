import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListComponent } from './character-list.component';
import { CharacterService } from '../character.service';
import { of } from 'rxjs';
import { mockCharacterList } from '../mocks/character-endpoint';

describe('CharacterListComponent', () => {
  const CharacterServiceMock: Partial<CharacterService> = {
    getCharacters: () => of(mockCharacterList)};

  const setup = () => {
    TestBed.configureTestingModule({
      declarations: [ CharacterListComponent ],
      providers:    [ {provide: CharacterService, useValue: CharacterServiceMock } ]
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
});
