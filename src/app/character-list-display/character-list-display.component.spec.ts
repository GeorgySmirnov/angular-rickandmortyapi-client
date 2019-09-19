import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListDisplayComponent } from './character-list-display.component';
import { Directive, Input } from '@angular/core';
import { mockCharacterList } from '../mocks/character-endpoint';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[routerLink]'
})
class RouterLinkMockDirective {
  @Input('routerLink') linkParams: any;
}

describe('CharacterListDisplayComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CharacterListDisplayComponent,
        RouterLinkMockDirective,
      ]
    })
    .compileComponents();
  }));

  const setup = () => {
    const fixture: ComponentFixture<CharacterListDisplayComponent> = TestBed.createComponent(CharacterListDisplayComponent);
    const component: CharacterListDisplayComponent = fixture.componentInstance;
    fixture.detectChanges();
    return { component, fixture };
  };

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should render character list', () => {
    const { component, fixture } = setup();
    component.characters = mockCharacterList;
    component.favorites = [1, 2, 3];
    fixture.detectChanges();
    const listElement: HTMLElement = fixture.nativeElement;
    const names: NodeListOf<Element> = listElement.querySelectorAll('.character-name');
    expect(names.length).toEqual(mockCharacterList.length);
    mockCharacterList.forEach((character, index) =>
      expect(names.item(index).textContent).toEqual(character.name));
  });

});
