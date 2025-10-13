import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingCoreComponent } from './typing-core.component';

describe('TypingCoreComponent', () => {
  let component: TypingCoreComponent;
  let fixture: ComponentFixture<TypingCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypingCoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypingCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
