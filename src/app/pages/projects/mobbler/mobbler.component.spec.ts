import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobblerComponent } from './mobbler.component';

describe('MobblerComponent', () => {
  let component: MobblerComponent;
  let fixture: ComponentFixture<MobblerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobblerComponent]
    });
    fixture = TestBed.createComponent(MobblerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
