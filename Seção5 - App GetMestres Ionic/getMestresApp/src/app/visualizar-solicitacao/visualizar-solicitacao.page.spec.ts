import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarSolicitacaoPage } from './visualizar-solicitacao.page';

describe('VisualizarSolicitacaoPage', () => {
  let component: VisualizarSolicitacaoPage;
  let fixture: ComponentFixture<VisualizarSolicitacaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarSolicitacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
