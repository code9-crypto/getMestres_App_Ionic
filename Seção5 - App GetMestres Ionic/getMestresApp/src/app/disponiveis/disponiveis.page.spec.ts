import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisponiveisPage } from './disponiveis.page';

describe('DisponiveisPage', () => {
  let component: DisponiveisPage;
  let fixture: ComponentFixture<DisponiveisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponiveisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
