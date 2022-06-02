import {useReducer} from 'react'
import './App.css'
import Board from './Board'
import Hint from './Hint'
import Key from './Key'
import reducer from './reducer'
import TypeList from './TypeList'
import {Actions, initialState} from './types'



const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)


  const handleEditToggle = () => {
    dispatch({
      type: Actions.toggleEditMode,
    })
  }

  const { opponentIndex } = state
  const opponentSelected = opponentIndex !== null

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

      {!state.isEditMode &&
        <Hint
          gameMode={state.gameMode}
          dispatch={dispatch}
          opponentSelected={opponentSelected}
        />
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

