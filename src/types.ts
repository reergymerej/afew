import {parseCardTypesText} from "./util"

export type CardType = {
  name: string,
  color?: string,
}

export type Player = {
  name: string,
  cardType: CardType,
  dieValue: number,
  isDead?: boolean,
  score: number,
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
metal gray
thunder yellow
dark black
light lightyellow
psychic purple
normal tan
`

export const cardTypes: CardType[] = parseCardTypesText(savedTypesDefs)


export type State = {
  canChangeType: boolean,
  defeatedPlayerIndex?: number,
  nextPlayerIndex: number,
  battleWinner?: string,
  battleResolved: boolean,
  battleResultTie?: boolean,
  players: Player[],
  types: CardType[],
  isEditMode: boolean,
  activePlayerIndex: number,
  gameMode: GameMode,
  opponentIndex: null | number,
  battleAttacks: {
    playerIndex: number,
  }[],
}

export const initialState: State = {
  canChangeType: true,
  nextPlayerIndex: 0,
  battleResolved: false,
  gameMode: GameMode.chooseCard,
  battleAttacks: [],
  isEditMode: false,
  activePlayerIndex: 0,
  opponentIndex: null,
  types: cardTypes,
  players: [
    {
      name: 'player1',
      cardType: cardTypes[1],
      dieValue: 0,
      score: 0,
    },
    {
      name: 'player2',
      cardType: cardTypes[0],
      dieValue: 0,
      score: 0,
    },
    {
      name: 'player3',
      cardType: cardTypes[1],
      dieValue: 0,
      score: 0,
    },
    {
      name: 'player4',
      cardType: cardTypes[2],
      dieValue: 0,
      score: 0,
    },
    {
      name: 'player5',
      cardType: cardTypes[3],
      dieValue: 0,
      score: 0,
    },
  ]
}

export enum Actions {
  addBattleAttack,
  changeTypes,
  nextGameMode,
  replacePlayer,
  resolveBattle,
  selectOpponent,
  setPlayerDieRoll,
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

export type AttackDetails = {
  attack: number | null,
  modifier: number | null,
}
