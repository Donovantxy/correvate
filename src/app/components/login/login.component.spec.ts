import { UserStore } from './../../store/state/user.state';
import { NgxsModule } from '@ngxs/store';
import { mockAuthService } from './../../../test-util/mock';
import { AuthService } from './../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el;
  let form: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        NgxsModule.forRoot([UserStore])],
      providers: [{ provide: AuthService, userValue: mockAuthService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    form = component.loginForm;
    form.get('username').setValue('fulvio78');
    form.get('email').setValue('fulvio@cosco.com');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the password should be valid', () => {
    form.get('password').setValue('fulcOsc0!');
    expect(form.valid).toBeTrue();
  });

  it('the password should not be valid', () => {
    form.get('password').setValue('fulcOsco');
    expect(form.valid).toBeFalse();
  });

});
