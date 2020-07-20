import { PetComponent } from './components/pet/pet.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './components/header/header.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'app',
    component: HeaderComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'user',
        component: UserPageComponent,
      },
      {
        path: 'pet/:id',
        component: PetComponent,
      },
    ]
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
