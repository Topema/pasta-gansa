import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSharesComponent } from './table-shares.component';

describe('TableSharesComponent', () => {
  let component: TableSharesComponent;
  let fixture: ComponentFixture<TableSharesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSharesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSharesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
