import React from 'react'
import { useState } from 'react'
import './App.css'

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

const advantageStep = 1 / (cardTypes.length - 2)

const getAdvantageModifier = (a: CardType, opponent: CardType): number => {
  const aIndex = cardTypes.indexOf(a)
  const opponentIndex = cardTypes.indexOf(opponent)
  const stepsToOpponent = getDistance(aIndex, opponentIndex, cardTypes.length)
  const advantage = (stepsToOpponent - 1) * advantageStep
  return Math.abs(advantage)
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
  return (
    <div className="Key">
      { props.cardTypes.map(cardType => {
        return (
          <div className="KeyItem" key={cardType}>
            {cardType} &lt;
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
      <div>
        <Key cardTypes={cardTypes} />
      </div>

      <div className="Board">
        { players.map((player, i) => {
          const playerIndex = players.indexOf(player)

          const handleChangeType = () => {
            const nextType = getNextType(player.cardType)
            replacePlayer(playerIndex,
              {
              ...player,
              cardType: nextType,
            })
          }
          const handleRoll: DieProps['onRoll'] = (value) => {
            replacePlayer(playerIndex,
              {
              ...player,
              dieValue: value,
            })
          }

          const opponent = players.filter((_, playerIndex) => playerIndex !== i)[0]
          const advantage = getAdvantageModifier(player.cardType, opponent.cardType)
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
              <span>attack: {attack}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App

