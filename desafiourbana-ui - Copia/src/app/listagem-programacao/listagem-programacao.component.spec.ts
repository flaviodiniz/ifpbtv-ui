import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemProgramacaoComponent } from './listagem-programacao.component';

describe('ListagemProgramacaoComponent', () => {
  let component: ListagemProgramacaoComponent;
  let fixture: ComponentFixture<ListagemProgramacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemProgramacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemProgramacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
