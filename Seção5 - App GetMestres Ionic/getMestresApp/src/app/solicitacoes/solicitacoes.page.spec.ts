import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitacoesPage } from './solicitacoes.page';

describe('SolicitacoesPage', () => {
  let component: SolicitacoesPage;
  let fixture: ComponentFixture<SolicitacoesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
