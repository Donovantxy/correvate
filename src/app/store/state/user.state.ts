import { ResetPet } from './../actions/pet.actions';
import { USER_STATE, PET_LIST } from './../../utils/constants';
import { Login, Logout, UpdateStore } from './../actions/user.actions';
import { Injectable } from '@angular/core';
import { State, Store, StateContext, Action } from '@ngxs/store';


export interface UserState {
  username: string;
  isLoggedIn: boolean;
  loginDate: Date;
  session: string;
}

const defaultState = {
  username: null,
  isLoggedIn: false,
  loginDate: null,
  session: null
};

@State<UserState>({
  name: 'user',
  defaults: defaultState
})

@Injectable()
export class UserStore {

  constructor(private store: Store) {}

  @Action(Login)
  login({ getState, setState }: StateContext<UserState>, {payload}) {
    setState({
      username: payload.username,
      isLoggedIn: true,
      loginDate: new Date(Date.now()),
      session: payload.session,
    });
    localStorage.setItem(USER_STATE, JSON.stringify(getState()));
  }

  @Action(UpdateStore)
  updateStore({ getState, setState }: StateContext<UserState>, {payload}) {
    setState({
      username: payload.username,
      isLoggedIn: true,
      loginDate: payload.loginDate,
      session: payload.session,
    });
  }

  @Action(Logout)
  logout({ setState }: StateContext<UserState>) {
    setState(defaultState);
    localStorage.removeItem(USER_STATE);
    this.store.dispatch(new ResetPet());
  }

}
