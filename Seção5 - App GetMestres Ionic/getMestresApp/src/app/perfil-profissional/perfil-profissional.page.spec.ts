import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilProfissionalPage } from './perfil-profissional.page';

describe('PerfilProfissionalPage', () => {
  let component: PerfilProfissionalPage;
  let fixture: ComponentFixture<PerfilProfissionalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilProfissionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
