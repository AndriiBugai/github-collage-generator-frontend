import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollagePage } from './collage-page.component';

describe('CollagePage', () => {
  let component: CollagePage;
  let fixture: ComponentFixture<CollagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollagePage],
    }).compileComponents();

    fixture = TestBed.createComponent(CollagePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
