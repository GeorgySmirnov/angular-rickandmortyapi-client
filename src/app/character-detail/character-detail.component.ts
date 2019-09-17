import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  public characterId: number;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
  ) { }

  ngOnInit() {
    this.getCharacter();
  }

  getCharacter(): void {
    this.characterId = +this.route.snapshot.paramMap.get('id');
  }

}
