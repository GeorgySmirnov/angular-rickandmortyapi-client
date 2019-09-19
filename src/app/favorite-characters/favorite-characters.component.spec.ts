import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCharactersComponent } from './favorite-characters.component';
import { AppRoutingModule } from '../app-routing.module';
import { CharacterService } from '../character.service';
import { of } from 'rxjs';
import { mockCharacterList } from '../mocks/character-endpoint';
import { FavoriteCharactersService } from '../favorite-characters.service';
import { CharacterListComponent } from '../character-list/character-list.component';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';

describe('FavoriteCharactersComponent', () => {
  const CharacterServiceMock: Partial<CharacterService> = {
    getCharactersByIds: (ids: number[]) => of(mockCharacterList)
  };
  const FavoriteCharactersServiceMock: Partial<FavoriteCharactersService> = {
    getList: () => [1, 2, 3],
  };

  let component: FavoriteCharactersComponent;
  let fixture: ComponentFixture<FavoriteCharactersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteCharactersComponent, CharacterListComponent, CharacterDetailComponent ],
      imports: [ AppRoutingModule ],
      providers:    [
        {provide: CharacterService, useValue: CharacterServiceMock },
        {provide: FavoriteCharactersService, useValue: FavoriteCharactersServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
