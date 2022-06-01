export type CardType = string

export type Player = {
  cardType: CardType,
  dieValue: number,
  attackValue: number, // TODO: calculate this instead of storing
}

export type State = {
  players: Player[],
  types: string[],
  activePlayerTypeChosen: boolean,
  isEditMode: boolean,
}

export enum Actions {
  replacePlayer,
  changeTypes,
  toggleEditMode,
}

export type Action = {
  type: Actions,
  value?: any,
}

export enum CombatResult {
  win,
  lose,
  draw,
}



