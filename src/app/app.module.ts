import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { FavoriteCharactersComponent } from './favorite-characters/favorite-characters.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterDetailComponent,
    FavoriteCharactersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
