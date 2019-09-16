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
    return { component };
  };

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });
});
