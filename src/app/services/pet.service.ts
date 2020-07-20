import { AddPet } from './../store/actions/pet.actions';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pet } from '../models/pet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient, private store: Store) { }

  addPet(pet: Pet): Observable<any> {
    return this.http.post(`${environment.apiUrl}/pet`, pet)
    .pipe(
      tap((resp) => {
        this.store.dispatch(new AddPet({...pet, id: resp.id}));
      })
    );
  }

}
