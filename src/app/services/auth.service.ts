import { Login } from './../store/actions/user.actions';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, private store: Store ) { }

  login(payload: User): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/login`, { params: {...payload}})
    .pipe(tap((resp) => {
      this.store.dispatch(new Login({...payload, session: resp.message.replace(/.+:(\d+)/, '$1')}));
    }));
  }

}
