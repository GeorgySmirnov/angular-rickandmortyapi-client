import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeepPartial } from 'ts-essentials';
import { CharacterDetailComponent } from './character-detail.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CharacterService } from '../character.service';
import { of } from 'rxjs';
import { mockCharacterList } from '../mocks/character-endpoint';

describe('CharacterDetailComponent', () => {
  const routeMock: DeepPartial<ActivatedRoute> = {
    snapshot: {
      paramMap: { get: () => '3'},
    }
  };
  const CharacterServiceMock: Partial<CharacterService> = {
    getCharacters: () => of(mockCharacterList)};

  const setup = () => {
    TestBed.configureTestingModule({
      declarations: [ CharacterDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: CharacterService, useValue: CharacterServiceMock },
      ]
    })
    .compileComponents();
    const fixture: ComponentFixture<CharacterDetailComponent> = TestBed.createComponent(CharacterDetailComponent);
    const component: CharacterDetailComponent = fixture.componentInstance;
    fixture.detectChanges();
    return { component, fixture };
  };

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });
});
