export type CardType = string

export type Player = {
  cardType: CardType,
  dieValue: number,
}

export enum GameMode {
  chooseCard,
  chooseOpponent,
  battle,
}

export const cardTypes: CardType[] = [
  'earth',
  'water',
  'air',
  'fire',
  'plant',
  'metal',
  'thunder',
  'dark',
  'light',
  'psychic',
]


export type State = {
  players: Player[],
  types: string[],
  activePlayerTypeChosen: boolean,
  isEditMode: boolean,
  activePlayerIndex: number,
  gameMode: GameMode,
  opponentIndex: null | number,
}

export const initialState: State = {
  gameMode: GameMode.chooseCard,
  isEditMode: false,
  activePlayerIndex: 0,
  activePlayerTypeChosen: !false,
  opponentIndex: null,
  types: cardTypes,
  players: [
    {
      cardType: cardTypes[1],
      dieValue: 0,
    },
    {
      cardType: cardTypes[0],
      dieValue: 0,
    },
    {
      cardType: cardTypes[1],
      dieValue: 0,
    },
    {
      cardType: cardTypes[2],
      dieValue: 0,
    },
    {
      cardType: cardTypes[3],
      dieValue: 0,
    },
  ]
}

export enum Actions {
  replacePlayer,
  changeTypes,
  toggleEditMode,
  nextGameMode,
  selectOpponent,
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



