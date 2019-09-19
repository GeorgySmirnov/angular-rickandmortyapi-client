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

  constructor(
    private characterService: CharacterService,
    private favoritesService: FavoriteCharactersService
  ) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    const favorites = this.favoritesService.getList();
    this.characterService.getCharactersByIds(favorites).subscribe(
      characters => this.characters = characters);
  }
}
