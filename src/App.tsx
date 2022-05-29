import React from 'react';
import { useState } from 'react';
import './App.css';

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
}

const Card: React.FunctionComponent<CardProps> = (props: CardProps) => {
  return (
    <div className="Card">
      {CardType[props.cardType]}
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
        return (
          <div key={i} className="Row">
            <button onClick={handleChangeType}>change type</button>
            <Card cardType={player.cardType} />
          </div>
        )
      })}
    </div>
  );
}

export default App;
