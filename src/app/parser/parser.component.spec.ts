import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserComponent } from './parser.component';

describe('ParserComponent', () => {
  let component: ParserComponent;
  let fixture: ComponentFixture<ParserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove Keyword string', () => {
    const stringKeyword = 'stringKeyword';
    expect(component.removeKeyword(stringKeyword)).toEqual('string');
  });

  it('should return modifier sign', () => {
    const stringKeyword = 'stringKeyword';
    expect(component.getUMLModifierSign(117)).toEqual('-');
  });

  it('should call Parse method', () => {
    const file = '../assets/files/person.ts';
    const parseFlySpy = spyOn(component, 'parseFile');

    component.ngOnInit();
    expect(parseFlySpy).toHaveBeenCalled();
  });

});
