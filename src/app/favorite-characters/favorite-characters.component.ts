import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { FavoriteCharactersService } from '../favorite-characters.service';
import { Character } from '../types/character';

@Component({
  selector: 'app-favorite-characters',
  templateUrl: './favorite-characters.component.html',
  styleUrls: ['./favorite-characters.component.css']
})
export class FavoriteCharactersComponent implements OnInit {
  public characters: Character[];
  public favorites: number[];

  constructor(
    private characterService: CharacterService,
    private favoritesService: FavoriteCharactersService
  ) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.favorites = this.favoritesService.getList();
    this.characterService.getCharactersByIds(this.favorites).subscribe(
      characters => this.characters = characters);
  }

  toggleFavorite(id: number) {
    this.favoritesService.toggleCharacter(id);
    this.getCharacters();
  }
}
