import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtendidasPage } from './atendidas.page';

describe('AtendidasPage', () => {
  let component: AtendidasPage;
  let fixture: ComponentFixture<AtendidasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendidasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
