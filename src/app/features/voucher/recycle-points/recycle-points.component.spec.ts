import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclePointsComponent } from './recycle-points.component';

describe('RecyclePointsComponent', () => {
  let component: RecyclePointsComponent;
  let fixture: ComponentFixture<RecyclePointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecyclePointsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecyclePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
