import { Observable, Subscription } from 'rxjs';
import { PetStore, PetState } from './../../store/state/pet.state';
import { GetPetFromLocalStore } from './../../store/actions/pet.actions';
import { Store, Select } from '@ngxs/store';
import { Pet } from './../../models/pet';
import { PET_LIST } from './../../utils/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from './../../services/pet.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {

  @Select(PetStore)
  petStore$: Observable<PetState>;

  user: User;
  petForm: FormGroup;
  isAdding = false;
  petList: Pet[] = [];
  subscription: Subscription;

  constructor(
    private petService: PetService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.petForm = this.fb.group({
      name: ['', [Validators.required]],
      url: ['', [Validators.required]],
    });
    this.store.dispatch(new GetPetFromLocalStore());
    this.subscription = this.petStore$
    .subscribe(petStore => {
      if ( petStore ) {
        this.petList = petStore.pet;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitPet() {
    this.isAdding = true;
    this.petForm.disable();
    this.petService.addPet({
      name: this.petForm.get('name').value,
      photoUrls: [this.petForm.get('url').value]
    }).subscribe(resp => {
      this.isAdding = false;
      this.petForm.enable();
    });
  }

  visitPet(id: string) {
    this.router.navigate(['app/pet', id]);
  }

}
