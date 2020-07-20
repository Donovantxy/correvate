import { UserPageComponent } from './../user-page/user-page.component';
import { mockActivatedRoute } from './../../../test-util/mock';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { PetStore } from './../../store/state/pet.state';
import { UserStore } from './../../store/state/user.state';
import { NgxsModule } from '@ngxs/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetComponent } from './pet.component';

describe('PetComponent', () => {
  let component: PetComponent;
  let fixture: ComponentFixture<PetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{path: 'app/user', component: UserPageComponent}]),
        NgxsModule.forRoot([UserStore, PetStore]),
      ],
      declarations: [ PetComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
