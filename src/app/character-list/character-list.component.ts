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
  public pages: number;
  private filter?: CharacterFilter;
  public page?: number;

  constructor(
    private characterService: CharacterService,
  ) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    if (this.page === undefined) {
      this.page = 1;
    }
    this.characterService.getCharacters(this.page, this.filter).subscribe(
      ({ characters, pages }) => {
        this.characters = characters;
        this.pages = pages;
      });
  }

  setPage(page: number) {
    this.page = Math.max(1, Math.min(this.pages, page));
    this.getCharacters();
  }

  setFilter(filterString: string) {
    if (filterString) {
      this.filter = this.parseFilterString(filterString);
    } else {
      this.filter = undefined;
    }
    this.page = 1;
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
