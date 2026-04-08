import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SliderField} from './slider-field';
import {FixtureHelper} from '../../utils/fixture-helper';

describe('SliderField', () => {
  let helper: FixtureHelper<SliderField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderField],
    }).compileComponents();
  });

  function createComponent(label: string, minVal: number, maxVal: number, value: number): ComponentFixture<SliderField> {
    const fixture = TestBed.createComponent(SliderField);
    fixture.componentRef.setInput('label', label);
    fixture.componentRef.setInput('minVal', minVal);
    fixture.componentRef.setInput('maxVal', maxVal);
    fixture.componentRef.setInput('value', value);
    fixture.detectChanges();
    helper = new FixtureHelper(fixture);
    return fixture;
  }

  it('should create', () => {
    const fixture = createComponent('Test', 0, 100, 50);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render label text', () => {
    createComponent('Collage Size', 0, 100, 50);
    expect(helper.getTrimmedTextContent('label')).toBe('Collage Size');
  });

  it('should display current value', () => {
    createComponent('Test', 0, 100, 42);
    expect(helper.getTrimmedTextContent('span[aria-hidden]')).toBe('42');
  });

  it('should link label for attribute to slider input id', () => {
    createComponent('Test', 0, 100, 50);
    expect(helper.getAttr('label', 'for')).toBe(helper.getAttr('input[id]', 'id'));
  });

  it('should generate unique labelId per instance', () => {
    const fixture1 = createComponent('Label A', 0, 100, 10);
    const helper1 = new FixtureHelper(fixture1);
    const fixture2 = createComponent('Label B', 0, 100, 20);
    const helper2 = new FixtureHelper(fixture2);

    expect(helper1.getAttr('label', 'for')).not.toEqual(helper2.getAttr('label', 'for'));
  });

  it('should reflect value set to the form', async () => {
    const fixture = createComponent('Test', 0, 100, 10);
    fixture.componentInstance.value.set(25);
    fixture.detectChanges();
    expect(helper.getTrimmedTextContent('span[aria-hidden]')).toBe('25');
  });

});
