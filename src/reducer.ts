import {GameMode, State, Action, Actions} from "./types"

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

    case Actions.toggleEditMode:
      return {
      ...state,
      isEditMode: !state.isEditMode,
    }

    case Actions.nextGameMode: {
      const nextGameMode = GameMode.chooseOpponent
      return {
        ...state,
        gameMode: nextGameMode,
      }
    }

    case Actions.selectOpponent: {
      return {
        ...state,
        opponentIndex: action.value,
      }
    }

    default:
      throw Error(`unhandled action in reducer: "${Actions[action.type]}"`)
  }
}

export default reducer
