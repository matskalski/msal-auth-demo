import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedPage } from './restricted-page';

describe('RestrictedPage', () => {
  let component: RestrictedPage;
  let fixture: ComponentFixture<RestrictedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestrictedPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestrictedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
