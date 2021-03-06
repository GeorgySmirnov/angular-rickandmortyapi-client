import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Character, CharacterFilter } from './types/character';

interface CharactersFetchResult {
  characters: Character[];
  pages: number;
}
@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private characterURL = 'https://rickandmortyapi.com/api/character/';

  constructor(
    private http: HttpClient,
  ) { }

  public getCharacters(page?: number, filter?: CharacterFilter): Observable<CharactersFetchResult> {
    return this.http.get<any>(this.characterURL, {
      params: {
        ...(page ? { page: `${page}` } : {}),
        ...filter,
      },
    }).pipe(
      map(result => ({
        characters: result.results,
        pages: result.info.pages,
      }))
    );
  }

  public getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.characterURL}${id}`);
  }

  public getCharactersByIds(ids: number[]): Observable<Character[]> {
    if (ids.length === 0) {
      return of([]);
    }
    return this.http.get<Character[]>(this.characterURL + ids.join(','))
      .pipe(map( result => Array.isArray(result) ? result : [ result ]));
  }
}
