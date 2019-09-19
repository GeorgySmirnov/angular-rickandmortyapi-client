import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../types/character';

@Component({
  selector: 'app-character-list-display',
  templateUrl: './character-list-display.component.html',
  styleUrls: ['./character-list-display.component.css']
})
export class CharacterListDisplayComponent implements OnInit {
  @Input() characters: Character[];
  @Input() favorites: number[];
  @Output() favoriteToggle = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  toggleFavorite(id: number) {
    this.favoriteToggle.emit(id);
  }
}
