import { PW_ERR_MSG } from './../../utils/constants';
import { delay } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';
import { AppValidators } from './../../utils/validators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  errorLogin = '';
  public loginForm: FormGroup;
  public isLogging = false;
  public passowrdErrMsg = PW_ERR_MSG;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required ]],
      email: ['', [Validators.required, Validators.pattern(new RegExp(AppValidators.emailRegEx))]],
      password: ['', [Validators.required, Validators.minLength(8), AppValidators.passwordLogin()]],
    });
  }

  login() {
    this.isLogging = true;
    this.loginForm.disable();
    this.authService.login(this.loginForm.value)
    .subscribe(resp => {
      this.router.navigate([`app/user`]);
      this.loginForm.enable();
      this.isLogging = false;
    });
  }

}
