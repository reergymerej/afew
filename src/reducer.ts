import {GameMode, State, Action, Actions, Player} from "./types"
import {getAttackDetails, sortBy} from "./util"

const reducer = (state: State, action: Action): State => {
  console.log(Actions[action.type])

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
            canChangeType: false,
            gameMode: GameMode.chooseOpponent,
          }

        case GameMode.chooseOpponent:
          return {
            ...state,
            gameMode: GameMode.battle,
          }

        case GameMode.battle: {
          const {
            players,
            defeatedPlayerIndex,
          } = state
          const newPlayers = players.map((player, i) => {
            return {
              ...player,
              dieValue: 0,
              isDead: player.isDead
                || (
                  defeatedPlayerIndex !== undefined
                    && i === defeatedPlayerIndex
                ),
            }
          })
          return {
            ...state,
            defeatedPlayerIndex: undefined,
            battleResultTie: undefined,
            battleWinner: undefined,
            gameMode: GameMode.chooseOpponent,
            opponentIndex: null,
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
      const sorter = sortBy('attack')
      const sorted = [...details].sort(sorter)
      if (sorted[0].attack === sorted[1].attack) {
        // tie
        return {
          ...state,
          nextPlayerIndex: state.activePlayerIndex,
          battleResultTie: true,
          battleWinner: '',
          battleAttacks: [],
          battleResolved: true,
        }
      }
      const winnerIndex = sorted[0].playerIndex
      const loserIndex = sorted[1].playerIndex
      const winner = state.players[winnerIndex]
      const nextPlayers = state.players.map((player, i) => {
        return {
          ...player,
          score: i === winnerIndex
            ? player.score + 1
            : player.score,
        }
      })
      return {
        ...state,
        nextPlayerIndex: winnerIndex,
        defeatedPlayerIndex: loserIndex,
        battleWinner: winner.name,
        battleAttacks: [],
        battleResolved: true,
        players: nextPlayers,
      }
    }

    case Actions.addBattleAttack: {
      return {
        ...state,
        battleAttacks: [
          ...state.battleAttacks,
          {
            playerIndex: action.value.playerIndex,
          },
        ],
      }
    }

    default:
      throw Error(`unhandled action in reducer: "${Actions[action.type]}"`)
  }
}

export default reducer
