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
      switch (state.gameMode) {
        case GameMode.chooseCard:
          return {
            ...state,
            gameMode: GameMode.chooseOpponent,
          }
        case GameMode.chooseOpponent:
          return {
            ...state,
            gameMode: GameMode.battle,
          }
        default:
          throw new Error(`unhandled case "${GameMode[state.gameMode]}"`)
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
