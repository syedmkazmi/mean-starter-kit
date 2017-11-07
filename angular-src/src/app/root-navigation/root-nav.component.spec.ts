import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootNavComponent } from './root-nav.component';

describe('RootNavComponent', () => {
  let component: RootNavComponent;
  let fixture: ComponentFixture<RootNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
