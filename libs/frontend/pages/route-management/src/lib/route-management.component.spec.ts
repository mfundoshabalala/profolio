import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteManagementComponent } from './route-management.component';

describe('RouteManagementComponent', () => {
  let component: RouteManagementComponent;
  let fixture: ComponentFixture<RouteManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RouteManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
