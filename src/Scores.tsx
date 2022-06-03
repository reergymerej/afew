import React from 'react'
import {Player} from './types'
import {sortBy} from './util'

type ScoresProps = {
  players: Player[]
}

const sorter = sortBy('score')

const Scores: React.FunctionComponent<ScoresProps> = ({
  players,
}) => {
  const sorted = [...players].sort(sorter)
  return (
    <div className="Scores">
      { sorted.map((player, i) => {
        return (
          <div
          key={player.name + i}
          className="ScoreItem">{player.name}: {player.score}</div>
        )
      })}
    </div>
  )
}

export default Scores
