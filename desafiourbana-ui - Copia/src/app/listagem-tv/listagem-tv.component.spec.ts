import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemTvComponent } from './listagem-tv.component';

describe('ListagemTvComponent', () => {
  let component: ListagemTvComponent;
  let fixture: ComponentFixture<ListagemTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemTvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
