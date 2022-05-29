import React from 'react'
import { useState } from 'react'
import './App.css'

enum CardType {
  air,
  fire,
  earth,
  water,
}

const cardTypes: CardType[] = Object.values(CardType)
  .filter(value => typeof value !== 'string')
  .map(value => value as CardType)

type CardProps = {
  cardType: CardType
  combatResult: CombatResult | null,
}

enum CombatResult {
  win,
  lose,
  draw,
}

const Card: React.FunctionComponent<CardProps> = (props: CardProps) => {
  const {
    cardType,
    combatResult,
  } = props
  return (
    <div className="Card">
      {CardType[cardType]}
      <br />
      {combatResult !== null && CombatResult[combatResult]}
    </div>
  )
}

type Player = {
  cardType: CardType,
}

const getNextType = (cardType: CardType): CardType => {
  const currentIndex = cardTypes.indexOf(cardType)
  const nextIndex = (currentIndex + 1) % cardTypes.length
  return cardTypes[nextIndex]
}

type State = {
  players: Player[],
}

const initialState: State = {
  players: [
    {
      cardType: cardTypes[0],
    },
    {
      cardType: cardTypes[0],
    },
  ]
}

const areOpposites = (a: CardType, b: CardType): boolean => {
  return (
    (a === CardType.air && b === CardType.earth)
    || (a === CardType.fire && b === CardType.water)
    || (a === CardType.earth && b === CardType.air)
    || (a === CardType.water && b === CardType.fire)
  )
}

const isStronger = (a: CardType, b: CardType): boolean => {
  //  A < F < E < W < A
  return (
    (a === CardType.air && b === CardType.water)
    || (a === CardType.fire && b === CardType.air)
    || (a === CardType.earth && b === CardType.fire)
    || (a === CardType.water && b === CardType.earth)
  )
}

const getCombatResult = (a: CardType, opponent: CardType): CombatResult => {
  if (a === opponent || areOpposites(a, opponent)) {
    return CombatResult.draw
  }
  return isStronger(a, opponent)
    ? CombatResult.win
    : CombatResult.lose
}

const App = () => {
  const [state, setState] = useState<State>(initialState)
  const { players} = state
  const replacePlayer = (replaceIndex: number, replacePlayer: Player) => {
    const newPlayers = players.map((player, i) => {
      if (i === replaceIndex) {
        return replacePlayer
      }
      return player
    })
    const nextState = {
      ...state,
      players: newPlayers,
    }
    setState(nextState)
  }

  return (
    <div className="App">
      { players.map((player, i) => {
        const handleChangeType = () => {
          const nextType = getNextType(player.cardType)
          const playerIndex = players.indexOf(player)
          replacePlayer(playerIndex,
            {
            ...player,
            cardType: nextType,
          })
        }

        const opponent = players.filter((_, playerIndex) => playerIndex !== i)[0]

        const combatResult = getCombatResult(player.cardType, opponent.cardType)

        return (
          <div key={i} className="Row">
            <button onClick={handleChangeType}>change type</button>
            <Card
              cardType={player.cardType}
              combatResult={combatResult}
            />
          </div>
        )
      })}
    </div>
  );
}

export default App

