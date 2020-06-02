import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySharesDialogComponent } from './buy-shares-dialog.component';

describe('BuySharesDialogComponent', () => {
  let component: BuySharesDialogComponent;
  let fixture: ComponentFixture<BuySharesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuySharesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySharesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
