import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { Character, CharacterFilter, CharacterFilterValues } from '../types/character';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  public characters: Character[];
  private filter?: CharacterFilter;

  constructor(
    private characterService: CharacterService,
  ) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.characterService.getCharacters(this.filter).subscribe(
      characters => this.characters = characters);
  }

  setFilter(filterString: string) {
    if (filterString) {
      this.filter = this.parseFilterString(filterString);
    } else {
      this.filter = undefined;
    }
    this.getCharacters();
  }

  parseFilterString(filterString: string): CharacterFilter {
    return filterString.split(',').map(filterParam => {
      const [key, ...rest] = filterParam.trim().split(' ');
      if (Object.keys(CharacterFilterValues).includes(key)) {
        return { [key]: rest.join(' ') };
      } else {
        return undefined;
      }
    }).reduce((acc, x) => ({...acc, ...x}), {});
  }
}
