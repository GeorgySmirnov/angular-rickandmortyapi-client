import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Episode } from './types/episode';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private episodeUrl = 'https://rickandmortyapi.com/api/episode/';

  constructor(
    private http: HttpClient,
  ) { }

  getEpisodes(ids: number[]): Observable<Episode[]> {
    return this.http.get<Episode[]>(this.episodeUrl + ids.join(','))
    .pipe(map( result => Array.isArray(result) ? result : [ result ]));
  }
}
