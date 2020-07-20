import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { mockAuthService } from './../../../test-util/mock';
import { AuthService } from './../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageComponent } from './user-page.component';
import { ActivatedRoute } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { appState } from 'src/app/store/state';

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPageComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxsModule.forRoot(appState),
      ],
      providers: [{provide: PetService, useValue: {addPet: () => {}}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
