import React from 'react'
import PlayerCard from './PlayerCard'
import Scores from './Scores'
import {Player, Action, State, GameMode} from './types'
import {getAttackDetails} from './util'

type BoardProps = {
  players: Player[]
  dispatch: React.Dispatch<Action>,
  state: State,
}

const Board: React.FunctionComponent<BoardProps> = ({
  dispatch,
  players,
  state,
}) => {
  const {
    activePlayerIndex,
    opponentIndex,
  } = state
  return (
    <div className="Board">
      <Scores players={state.players} />
      <div className="Players">
        { players.map((player, i) => {
          const isActivePlayer = i === activePlayerIndex
          const thisPlayersOpponent = isActivePlayer
            ? state.opponentIndex
            : activePlayerIndex

            const opponent = thisPlayersOpponent === null ? null : players[thisPlayersOpponent]
            const playerIsBattling = isActivePlayer || i === opponentIndex
            const showChangeType = state.canChangeType && isActivePlayer && state.gameMode === GameMode.chooseCard

            const { modifier, attack } = getAttackDetails(player, opponent, state.types)

            const showDie = (state.gameMode === GameMode.battle) && playerIsBattling

            return (
          <div key={i} className="Row">
          {!player.isDead &&
          <PlayerCard
            showChangeType={showChangeType}
            playerIsBattling={playerIsBattling}
            player={player}
            state={state}
            playerIndex={i}
            dispatch={dispatch}
            isActivePlayer={isActivePlayer}
            attack={attack || null}
            modifier={modifier}
            hideDie={!showDie}
            />
          }
          </div>
            )
        })}
      </div>
    </div>
  )
}

export default Board

