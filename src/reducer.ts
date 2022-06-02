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
            opponentIndex: null,
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
            battleWinner: undefined,
            gameMode: GameMode.chooseCard,
            players: newPlayers,
            battleResolved: false,
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
      const { battleAttacks } = state
      const values = battleAttacks.map(x => x.value)
      let winnerIndex: number
      if (values[0] > values[1]) {
        winnerIndex = 0
      } else if (values[1] > values[0]) {
        winnerIndex = 1
      } else {
        throw new Error('tie not implemented')
      }
      const winnerPlayerIndex = battleAttacks[winnerIndex].playerIndex

      return {
        ...state,
        battleWinner: state.players[winnerPlayerIndex].name,
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
