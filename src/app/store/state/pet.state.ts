import { UserState, UserStore } from './user.state';
import { AddPet, ResetPet, GetPetFromLocalStore } from './../actions/pet.actions';
import { Pet } from './../../models/pet';
import { USER_STATE, PET_LIST } from './../../utils/constants';
import { Login } from './../actions/user.actions';
import { Injectable } from '@angular/core';
import { State, Store, StateContext, Action } from '@ngxs/store';


export interface PetState {
  username: string;
  pet: Pet[];
}

const defaultState = {
  username: null,
  pet: [],
};

@State<PetState>({
  name: 'pet',
  defaults: defaultState
})

@Injectable()
export class PetStore {
  constructor(private store: Store) {}

  @Action(AddPet)
  addPet({ getState, setState }: StateContext<PetState>, {payload}) {
    const petList = getState().pet;
    petList.push(payload);
    setState({
      username: this.store.selectSnapshot(UserStore).username,
      pet: petList
    });
    localStorage.setItem(PET_LIST, JSON.stringify(getState().pet));
  }

  @Action(GetPetFromLocalStore)
  getPetFromLocalStore({ getState, setState }: StateContext<PetState>) {
    const petFroStorage = localStorage.getItem(PET_LIST);
    if ( petFroStorage ) {
      setState({
        username: this.store.selectSnapshot(UserStore).username,
        pet: JSON.parse(petFroStorage)
      });
    }
  }

  @Action(ResetPet)
  reset({ setState }: StateContext<PetState>) {
    setState({
      username: null,
      pet: []
    });
    localStorage.removeItem(PET_LIST);
  }

}
