import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovaSolicitacaoPage } from './nova-solicitacao.page';

describe('NovaSolicitacaoPage', () => {
  let component: NovaSolicitacaoPage;
  let fixture: ComponentFixture<NovaSolicitacaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaSolicitacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
