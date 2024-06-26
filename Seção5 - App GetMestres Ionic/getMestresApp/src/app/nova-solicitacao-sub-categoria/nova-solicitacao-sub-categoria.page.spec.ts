import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovaSolicitacaoSubCategoriaPage } from './nova-solicitacao-sub-categoria.page';

describe('NovaSolicitacaoSubCategoriaPage', () => {
  let component: NovaSolicitacaoSubCategoriaPage;
  let fixture: ComponentFixture<NovaSolicitacaoSubCategoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaSolicitacaoSubCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
