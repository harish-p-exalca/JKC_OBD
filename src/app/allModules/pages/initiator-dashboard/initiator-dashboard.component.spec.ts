import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiatorDashboardComponent } from './initiator-dashboard.component';

describe('InitiatorDashboardComponent', () => {
  let component: InitiatorDashboardComponent;
  let fixture: ComponentFixture<InitiatorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiatorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiatorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
