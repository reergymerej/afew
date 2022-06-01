import {useReducer} from 'react'
import './App.css'
import Board from './Board'
import Key from './Key'
import reducer from './reducer'
import TypeList from './TypeList'
import {Actions, CardType, State} from './types'



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
      <Board
        state={state}
        dispatch={dispatch}
        players={state.players}
      />
      }

    </div>
  );
}

export default App

