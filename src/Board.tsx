import React from 'react'
import PlayerCard from './PlayerCard'
import {CardType, Player, Action, State, Actions} from './types'

const getDistance = (a: number, b: number, mod: number): number => {
  // Return modulo distance, steps from a to b.
  if (b < a) {
    return mod - a + b
  }
  return b - a
}

const getAdvantageModifier = (a: CardType, opponent: CardType, cardTypes: CardType[]): number => {
  if (a === opponent) {
    return 0
  }
  const aIndex = cardTypes.indexOf(a)
  const opponentIndex = cardTypes.indexOf(opponent)
  const stepsToOpponent = getDistance(aIndex, opponentIndex, cardTypes.length)
  const HIGH = 1
  const LOW = -1.4
  const span = Math.abs(HIGH - LOW)
  const steps = cardTypes.length - 1
  const interval = span / (steps - 1)
  const advantage = HIGH - (interval * (stepsToOpponent - 1))
  return advantage
}


type BoardProps = {
  players: Player[]
  dispatch: React.Dispatch<Action>,
  state: State,
}

const Board: React.FunctionComponent<BoardProps> = ({
  dispatch,
  players,
  state,
}) => {
  const {
    activePlayerIndex,
    opponentIndex,
  } = state
  return (
    <div className="Board">
      { players.map((player, i) => {
        const isActivePlayer = i === activePlayerIndex
        const opponentIndex = isActivePlayer
          ? state.opponentIndex
          : activePlayerIndex

        const opponent = opponentIndex !== null && players[opponentIndex]
        const modifier = !opponent ? null : getAdvantageModifier(
          player.cardType,
          opponent.cardType,
          state.types,
        )
        const attack = player.dieValue + (modifier || 0)

        return (
          <div key={i} className="Row">
            <PlayerCard
              player={player}
              state={state}
              playerIndex={i}
              dispatch={dispatch}
              isActivePlayer={isActivePlayer}
              attack={attack}
              modifier={modifier}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Board
