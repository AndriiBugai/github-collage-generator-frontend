import {ComponentFixture} from '@angular/core/testing';

export class FixtureHelper<T> {
  constructor(private fixture: ComponentFixture<T>) {}

  public getTrimmedTextContent(selector: string): string {
    return this.fixture.nativeElement.querySelector(selector).textContent?.trim() ?? '';
  }

  public getAttr(selector: string, attribute: string): string | null {
    return this.fixture.nativeElement.querySelector(selector).getAttribute(attribute);
  }

  public getElement<E extends HTMLElement = HTMLElement>(selector: string): E {
    return this.fixture.nativeElement.querySelector(selector);
  }

  public getElements<E extends HTMLElement = HTMLElement>(selector: string): E[] {
    return Array.from(this.fixture.nativeElement.querySelectorAll(selector));
  }
}
