import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeepPartial } from 'ts-essentials';
import { CharacterDetailComponent } from './character-detail.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CharacterService } from '../character.service';
import { of } from 'rxjs';
import { mockCharacterList } from '../mocks/character-endpoint';

describe('CharacterDetailComponent', () => {
  const CharacterServiceMock: Partial<CharacterService> = {
    getCharacter: (id: number) => of(mockCharacterList[id])};

  const setup = (routeId: number = 0) => {
    const routeMock: DeepPartial<ActivatedRoute> = {
      snapshot: {
        paramMap: { get: () => `${routeId}`},
      }
    };
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

  it('should get character in route on initialization', () => {
    const { component } = setup(0);
    expect(component.character).toEqual(mockCharacterList[0]);
  });

  describe('Renders details for different characters', () => {
    mockCharacterList.forEach((character, index) => {
      it(`Renders ${character.name}`, () => {
        const { fixture } = setup(index);
        const listElement: HTMLElement = fixture.nativeElement;
        const name: Element = listElement.querySelector('.character-name');
        expect(name.textContent).toEqual(character.name);
      });
    });
  });
});
