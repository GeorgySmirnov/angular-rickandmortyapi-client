import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCharactersService {
  private favorites: Set<number>;

  constructor() {
    this.favorites = new Set<number>();
   }

  getList(): number[] {
    return [...this.favorites.values()].sort((a, b) => a - b);
  }

  toggleCharacter(id: number) {
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
    } else {
      this.favorites.add(id);
    }
  }
}
