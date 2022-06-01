import React from 'react'
import Card from './Card'
import Die, {DieProps} from './Die'
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

const getNextType = (cardType: CardType, cardTypes:CardType[]): CardType => {
  const currentIndex = cardTypes.indexOf(cardType)
  const nextIndex = (currentIndex + 1) % cardTypes.length
  return cardTypes[nextIndex]
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
  return (
      <div className="Board">
          { players.map((player, i) => {
            const playerIndex = players.indexOf(player)

            const handleChangeType = () => {
              const nextType = getNextType(player.cardType, state.types)
              dispatch({
                type: Actions.replacePlayer,
                value: {
                  replaceIndex: playerIndex,
                  replacePlayer: {
                    ...player,
                    cardType: nextType,
                  },
                },
              })
            }
            const handleRoll: DieProps['onRoll'] = (value) => {
              dispatch({
                type: Actions.replacePlayer,
                value: {
                  replaceIndex: playerIndex,
                  replacePlayer: {
                    ...player,
                    dieValue: value,
                  },
                },
              })
            }

            const opponent = players.filter((_, playerIndex) => playerIndex !== i)[0]
            const modifier = getAdvantageModifier(
              player.cardType,
              opponent.cardType,
              state.types,
            )
            const attack = player.dieValue + modifier

            return (
              <div key={i} className="Row">
                <button onClick={handleChangeType}>change type</button>

                <Card
                  modifier={modifier}
                  cardType={player.cardType}
                  combatResult={null}
                />
                <Die
                  value={player.dieValue}
                  onRoll={handleRoll}
                />
                <span>attack: {attack.toFixed(2)}</span>
              </div>
            )
          })}
      </div>
    )
}

export default Board
