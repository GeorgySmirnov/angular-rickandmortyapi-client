import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeepPartial } from 'ts-essentials';
import { CharacterDetailComponent } from './character-detail.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CharacterService } from '../character.service';
import { of } from 'rxjs';
import { mockCharacterList } from '../mocks/character-endpoint';
import { EpisodeService } from '../episode.service';
import { episodesMock } from '../mocks/episode-endpoint';

describe('CharacterDetailComponent', () => {
  const setup = (routeId: number = 0) => {
    const CharacterServiceMock: Partial<CharacterService> = {
      getCharacter: (id: number) => of(mockCharacterList[id])};
    const getEpisodes = jasmine.createSpy('getEpisodes').and.returnValue(of(episodesMock));
    const EpisodeServiceMock: Partial<EpisodeService> = {
      getEpisodes};
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
        { provide: EpisodeService, useValue: EpisodeServiceMock }
      ]
    })
    .compileComponents();
    const fixture: ComponentFixture<CharacterDetailComponent> = TestBed.createComponent(CharacterDetailComponent);
    const component: CharacterDetailComponent = fixture.componentInstance;
    fixture.detectChanges();
    return { component, fixture, getEpisodes };
  };

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should get character in route on initialization', () => {
    const { component } = setup(0);
    expect(component.character).toEqual(mockCharacterList[0]);
  });

  describe('gets episodes for different characters', () => {
    mockCharacterList.forEach((character, index) => {
      it(`episodes for ${character.name}`, () => {
        const { getEpisodes } = setup(index);
        expect(getEpisodes).toHaveBeenCalledWith(character.episode.map(url => +url.split('/').pop()));
      });
    });
  });

  describe('Renders details for different characters', () => {
    mockCharacterList.forEach((character, index) => {
      it(`renders ${character.name}`, () => {
        const { fixture } = setup(index);
        const componentElement: HTMLElement = fixture.nativeElement;
        const name: Element = componentElement.querySelector('h2');
        expect(name.textContent).toEqual(character.name);
      });
    });
  });

  it('Renders episode list', () => {
    const { fixture } = setup();
    const componentElement: HTMLElement = fixture.nativeElement;
    const code: NodeListOf<Element> = componentElement.querySelectorAll('.episode-code');
    episodesMock.forEach((episode, index) =>
      expect(code.item(index + 1).textContent).toEqual(episode.episode));
  });
});
