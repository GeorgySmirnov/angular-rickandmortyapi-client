import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { Character } from '../types/character';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  public characters: Character[];

  constructor(
    private characterService: CharacterService,
  ) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.characterService.getCharacters().subscribe(
      characters => this.characters = characters);
  }
}
