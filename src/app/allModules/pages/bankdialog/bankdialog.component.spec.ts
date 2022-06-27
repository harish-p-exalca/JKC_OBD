import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankdialogComponent } from './bankdialog.component';

describe('BankdialogComponent', () => {
  let component: BankdialogComponent;
  let fixture: ComponentFixture<BankdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
