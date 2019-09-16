import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Character } from './types/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private characterURL = 'https://rickandmortyapi.com/api/character/';

  constructor(
    private http: HttpClient,
  ) { }

  public getCharacters(): Observable<Character[]> {
    return this.http.get<any>(this.characterURL).pipe(
      map(result => result.results)
    );
  }
}
