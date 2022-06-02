import {GameMode, State, Action, Actions, Player} from "./types"

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
        case GameMode.battle: {
          const newPlayers = state.players.map(player => {
            return {
              ...player,
              dieValue: 0,
            }
          })
          return {
            ...state,
            gameMode: GameMode.chooseCard,
            players: newPlayers,
          }
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

    case Actions.setPlayerDieRoll: {
      const { players} = state
      const {
        playerIndex,
        dieValue,
      } = action.value
      const newPlayers = players.map((player, i): Player => {
        if (i === playerIndex) {
          return {
            ...player,
            dieValue,
          }
        }
        return player
      })
      return {
        ...state,
        players: newPlayers,
      }
    }

    case Actions.resolveBattle: {
      // Who won?
      return {
        ...state,
        battleAttacks: [],
        battleResolved: true,
      }
    }

    case Actions.addBattleAttack: {
      return {
        ...state,
        battleAttacks: [
          ...state.battleAttacks,
          {
            playerIndex: action.value.playerIndex,
            value: action.value.attack,
          },
        ],
      }
    }

    default:
      throw Error(`unhandled action in reducer: "${Actions[action.type]}"`)
  }
}

export default reducer
