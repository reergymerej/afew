import {useReducer} from 'react'
import './App.css'
import Board from './Board'
import Key from './Key'
import reducer from './reducer'
import TypeList from './TypeList'
import {Action, Actions, initialState, State} from './types'


const stateWatcher = (state: State, dispatch: React.Dispatch<Action>) => {
  const {
    battleAttacks,
  } = state
  if (battleAttacks.length === 2) {
    dispatch({
      type: Actions.resolveBattle,
    })
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  stateWatcher(state, dispatch)

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
            dispatch={dispatch}
            types={state.types}
          />
        </div>
      }

      {!state.isEditMode && state.battleWinner &&
        <h2>{state.battleWinner} wins!</h2>
      }
      {!state.isEditMode && state.battleResultTie &&
        <h2>Tie!</h2>
      }

      { !state.isEditMode &&
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

