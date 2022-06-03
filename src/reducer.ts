import {GameMode, State, Action, Actions, Player} from "./types"
import {getAttackDetails} from "./util"

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
            battleResultTie: undefined,
            battleWinner: undefined,
            gameMode: GameMode.chooseCard,
            players: newPlayers,
            battleResolved: false,
            activePlayerIndex: state.nextPlayerIndex,
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
      const indices = battleAttacks.map(x => x.playerIndex)
      const players = indices.map(i => state.players[i])
      const details = players.map((player, i, all) => {
        const opponent = all.find(x => x !== player) || null
        return {
          playerIndex: indices[i],
          attack: getAttackDetails(player, opponent, state.types).attack || 0,
        }
      })
      const sorted = details.sort((a, b) => b.attack - a.attack)
      if (sorted[0].attack === sorted[1].attack) {
        return {
          ...state,
          battleResultTie: true,
          battleWinner: '',
          battleAttacks: [],
          battleResolved: true,
        }
      }
      const winnerIndex = sorted[0].playerIndex
      const winner = state.players[winnerIndex]
      return {
        ...state,
        nextPlayerIndex: winnerIndex,
        battleWinner: winner.name,
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
