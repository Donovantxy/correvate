
export class AddPet {
  static readonly type = '[Pet] add';
  constructor(public payload){}
}

export class GetPetFromLocalStore {
  static readonly type = '[Pet] get pet list from local storage';
  constructor(){}
}

export class ResetPet {
  static readonly type = '[Pet] reset';
  constructor(){}
}

