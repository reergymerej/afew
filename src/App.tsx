import React from 'react';
import { useState } from 'react';
import './App.css';

enum CardType {
  air,
  fire,
  earth,
  water,
}

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
  const types: CardType[] = [
    CardType.air,
    CardType.fire,
    CardType.earth,
    CardType.water,
  ]
  const currentIndex = types.indexOf(cardType)
  const nextIndex = (currentIndex + 1) % types.length
  return types[nextIndex]
}

type State = {
  players: Player[],
}

const initialState: State = {
  players: [
    {
      cardType: CardType.fire,
    },
    {
      cardType: CardType.earth,
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
