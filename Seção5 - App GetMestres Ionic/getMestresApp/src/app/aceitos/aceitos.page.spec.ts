import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AceitosPage } from './aceitos.page';

describe('AceitosPage', () => {
  let component: AceitosPage;
  let fixture: ComponentFixture<AceitosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AceitosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
