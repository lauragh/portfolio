import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobliComponent } from './cobli.component';

describe('CobliComponent', () => {
  let component: CobliComponent;
  let fixture: ComponentFixture<CobliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CobliComponent]
    });
    fixture = TestBed.createComponent(CobliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
