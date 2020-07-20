import { UserState, UserStore } from './../../store/state/user.state';
import { Logout, UpdateStore } from './../../store/actions/user.actions';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { USER_STATE } from 'src/app/utils/constants';
import { Store } from '@ngxs/store';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  firstName: string;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    const userState: UserState = this.getUserState();
    if (!userState) {
      this.router.navigate(['']);
    }
    this.firstName = userState?.username;
  }

  logout() {
    this.store.dispatch(new Logout())
    .subscribe((userState: UserState) => {
      if ( !userState.isLoggedIn ) {
        this.router.navigate(['']);
      }
    });
  }

  private getUserState(): UserState {
    let user = this.store.selectSnapshot(UserStore);
    if ( user.isLoggedIn ) {
      return user;
    } else {
      user = localStorage.getItem(USER_STATE);
      if (user) {
        user = JSON.parse(user);
        this.store.dispatch(new UpdateStore(user));
        return user;
      }
    }
    return null;
  }
}
