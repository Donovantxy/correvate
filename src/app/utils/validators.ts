import { isInString } from './functions';
import { PW_ERR_MSG } from './constants';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export class AppValidators {

  public static readonly emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public static passwordLogin(): ValidatorFn {
    return (ctrl: AbstractControl): object => {
      let check = /[A-Z]+/.test(ctrl.value);
      check = check ? /\d+/.test(ctrl.value) : check;
      check = check ? /[^\w]+/.test(ctrl.value) : check;
      return check ? null : { password: PW_ERR_MSG };
    };
  }

}
