import React, {useReducer} from 'react'
import './App.css'
import Card from './Card'
import Die, {DieProps} from './Die'
import Key from './Key'
import reducer from './reducer'
import TypeList from './TypeList'
import {Actions, CardType, State} from './types'


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


const cardTypes: CardType[] = [
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

const initialState: State = {
  isEditMode: false,
  activePlayerTypeChosen: !false,
  types: cardTypes,
  players: [
    {
      cardType: cardTypes[1],
      dieValue: 1,
      attackValue: 0,
    },
    {
      cardType: cardTypes[0],
      dieValue: 1,
      attackValue: 0,
    },
  ]
}



const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const {players} = state

  const handeTypeListChange = (newTypes: string[]) => {
    dispatch({
      type: Actions.changeTypes,
      value: newTypes,
    })
  }

  const handleEditToggle = () => {
    dispatch({
      type: Actions.toggleEditMode,
    })
  }

  return (
    <div className="App">
      <div>
        <Key cardTypes={state.types} />
        <button onClick={handleEditToggle}>
          edit mode
        </button>
      </div>

      { state.isEditMode &&
        <div className="TypeList">
          <TypeList
            onChange={handeTypeListChange}
            types={state.types}
          />
        </div>
      }

      {!state.isEditMode &&
        <ol>
          <li>
            Choose your card to play.
          </li>
          <li>
            Choose opponent.
          </li>
          <li>
            Roll die.
          </li>
        </ol>
      }

      {!state.isEditMode && !state.activePlayerTypeChosen &&
        <div>choose type</div>
      }

      { !state.isEditMode && state.activePlayerTypeChosen &&
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
      }

    </div>
  );
}

export default App

