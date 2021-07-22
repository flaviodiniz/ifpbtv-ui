import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemMidiaComponent } from './listagem-midia.component';

describe('ListagemMidiaComponent', () => {
  let component: ListagemMidiaComponent;
  let fixture: ComponentFixture<ListagemMidiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemMidiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemMidiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
