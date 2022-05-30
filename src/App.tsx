import React, {useReducer} from 'react'
import './App.css'
import TypeList from './TypeList'

type CardType = string

const cardTypes: CardType[] = [
  'air',
  'fire',
  'earth',
  'water',
  'plant',
  'psychic',
  'light',
  'dark',
  'metal',
  'poison',
  'thunder',
  'divine',
]

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
  const high = 1
  const low = -1
  const span = Math.abs(high - low)
  const steps = cardTypes.length - 1
  const interval = span / (steps - 1)
  const advantage = high - (interval * (stepsToOpponent - 1))
  console.log({advantage})
  return advantage
}

enum CombatResult {
  win,
  lose,
  draw,
}

type CardProps = {
  cardType: CardType
  combatResult: CombatResult | null,
  advantage: number,
}

const Card: React.FunctionComponent<CardProps> = (props: CardProps) => {
  const {
    advantage,
    cardType,
    combatResult,
  } = props
  return (
    <div className="Card">
      <h1>
        {cardType}
      </h1>
      <br />
      advantage: {advantage.toFixed(2)}
      <br />
      {combatResult !== null && CombatResult[combatResult]}
    </div>
  )
}

type Player = {
  cardType: CardType,
  dieValue: number,
  attackValue: number, // TODO: calculate this instead of storing
}

const getNextType = (cardType: CardType, cardTypes:CardType[]): CardType => {
  const currentIndex = cardTypes.indexOf(cardType)
  const nextIndex = (currentIndex + 1) % cardTypes.length
  return cardTypes[nextIndex]
}

type State = {
  players: Player[],
  types: string[],
}

const initialState: State = {
  types: [
    'air',
    'fire',
    'earth',
    'water',
    // 'plant',
    // 'psychic',
    // 'light',
    // 'dark',
    // 'metal',
    // 'poison',
    // 'thunder',
    // 'divine',
  ],
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
    // {
    //   cardType: cardTypes[0],
    // },
    // {
    //   cardType: cardTypes[0],
    // },
  ]
}

type KeyProps = {
  cardTypes: CardType[],
}

const Key: React.FunctionComponent<KeyProps> = (props: KeyProps) => {
  const typesCopy = [
    ...props.cardTypes,
    props.cardTypes[0],
  ]
  return (
    <div className="Key">
      { typesCopy.map((cardType, i, all) => {
        return (
          <div className="KeyItem" key={cardType + i}>
            {cardType} {i < all.length - 1 && '<'}
          </div>
        )
      })}
    </div>
  )
}

const rand = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min)
}

type DieProps = {
  value: number,
  onRoll: (value: number) => void,
}

const Die: React.FunctionComponent<DieProps> = (props: DieProps) => {
  const { value, onRoll, } = props
  const handleClick = () => {
    const newValue = rand(1, 6)
    onRoll(newValue)
  }
  return (
    <div className="Die" onClick={handleClick}>{value}</div>
  )
}

enum Actions {
  replacePlayer,
  changeTypes,
}

type Action = {
  type: Actions,
  value?: any,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.replacePlayer: {
      const { players} = state
      const {
        replaceIndex,
        replacePlayer,
      } = action.value
      const newPlayers = players.map((player, i) => {
        if (i === replaceIndex) {
          return replacePlayer
        }
        return player
      })
      return {
        ...state,
        players: newPlayers,
      }
    }

    case Actions.changeTypes: {
      return {
        ...state,
        types: action.value,
      }
    }

    default:
      throw Error(`unhandled action in reducer: "${Actions[action.type]}"`)
  }
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

  return (
    <div className="App">
      <div>
        <Key cardTypes={state.types} />
      </div>

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
          const advantage = getAdvantageModifier(
            player.cardType,
            opponent.cardType,
            state.types,
          )
          const attack = player.dieValue + advantage

          return (
            <div key={i} className="Row">
              <button onClick={handleChangeType}>change type</button>

              <Card
                advantage={advantage}
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

      <div className="TypeList">
        <TypeList
          onChange={handeTypeListChange}
          types={state.types}
        />
      </div>
    </div>
  );
}

export default App

