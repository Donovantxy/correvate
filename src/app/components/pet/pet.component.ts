import { GetPetFromLocalStore } from './../../store/actions/pet.actions';
import { Observable } from 'rxjs';
import { PetStore, PetState } from './../../store/state/pet.state';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from './../../models/pet';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {

  @Select(PetStore)
  petStore$: Observable<PetState>;
  pet: Pet;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetPetFromLocalStore());
    const id = this.route.snapshot.params['id'];
    if ( id ) {
      this.petStore$
      .subscribe( (petStore: PetState) => {
        this.pet = petStore.pet.find(pet => pet.id.toString() === id);
      });
    } else {
      this.router.navigate(['app/user']);
    }
  }

  goBackToUserPage() {
    this.router.navigate(['app/user']);
  }

}
