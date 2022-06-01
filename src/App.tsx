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
        <Hint gameMode={state.gameMode} />
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

