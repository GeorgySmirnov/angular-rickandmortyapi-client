import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../character.service';
import { Character } from '../types/character';
import { EpisodeService } from '../episode.service';
import { Episode } from '../types/episode';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  public character: Character;
  public episodes: Episode[];

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private episodeService: EpisodeService,
  ) { }

  ngOnInit() {
    this.getCharacter();
  }

  getCharacter(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.characterService.getCharacter(id).subscribe(
      result => this.setCharacter(result));
  }

  setCharacter(character: Character): void {
    this.character = character;
    this.getEpisodes();
  }

  getEpisodes(): void {
    const ids: number[] = this.character.episode.map(
      url => +/\d+$/.exec(url)[0]);
    this.episodeService.getEpisodes(ids).subscribe(
      result => this.episodes = result);
  }
}
