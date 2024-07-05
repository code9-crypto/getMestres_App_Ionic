import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarMinhaSolicitacaoPage } from './visualizar-minha-solicitacao.page';

describe('VisualizarMinhaSolicitacaoPage', () => {
  let component: VisualizarMinhaSolicitacaoPage;
  let fixture: ComponentFixture<VisualizarMinhaSolicitacaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarMinhaSolicitacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
