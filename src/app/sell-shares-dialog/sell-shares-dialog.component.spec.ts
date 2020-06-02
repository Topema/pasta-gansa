import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellSharesDialogComponent } from './sell-shares-dialog.component';

describe('SellSharesDialogComponent', () => {
  let component: SellSharesDialogComponent;
  let fixture: ComponentFixture<SellSharesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellSharesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellSharesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
