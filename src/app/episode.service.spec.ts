import { TestBed } from '@angular/core/testing';

import { EpisodeService } from './episode.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { episodesMock } from './mocks/episode-endpoint';

describe('EpisodeService', () => {
  const episodeUrl = 'https://rickandmortyapi.com/api/episode/';
  const setup = () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    const service: EpisodeService = TestBed.get(EpisodeService);
    const http: HttpTestingController = TestBed.get(HttpTestingController);
    return { service, http };
  };

  it('should be created', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });

  it('Should return an episode list', (done) => {
    const episodeIds = [1, 2, 3, 4];
    const { service, http } = setup();
    service.getEpisodes(episodeIds).subscribe(result => {
      expect(result).toEqual(episodesMock);
      done();
    });
    http.expectOne(episodeUrl + '1,2,3,4').flush(episodesMock);
  });
});
