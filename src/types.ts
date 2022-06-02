import {parseCardTypesText} from "./util"

export type CardType = {
  name: string,
  color?: string,
}

export type Player = {
  cardType: CardType,
  dieValue: number,
}

export enum GameMode {
  chooseCard,
  chooseOpponent,
  battle,
}

const savedTypesDefs = `
earth brown
water blue
air lightblue
fire red
plant green
metal silver
thunder orange
dark black
light yellow
psychic purple
`

export const cardTypes: CardType[] = parseCardTypesText(savedTypesDefs)


export type State = {
  players: Player[],
  types: CardType[],
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
  setPlayerDieRoll,
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



