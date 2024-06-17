import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcluidosPage } from './concluidos.page';

describe('ConcluidosPage', () => {
  let component: ConcluidosPage;
  let fixture: ComponentFixture<ConcluidosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcluidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
