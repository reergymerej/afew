import React from 'react'
import {CardType, CombatResult} from './types'
import cx from 'classnames'

type CardProps = {
  cardType: CardType
  combatResult: CombatResult | null,
  modifier: number | null,
  isActivePlayer: boolean,
  isOpponent: boolean,
  flipped: boolean,
  hideModifier: boolean,
  onClick: () => void,
}

const Card: React.FunctionComponent<CardProps> = (props: CardProps) => {
  const {
    modifier,
    cardType,
    combatResult,
    isActivePlayer,
    isOpponent,
    flipped,
    hideModifier,
    onClick,
  } = props
  return (
    <div className={cx("Card", {
      active: isActivePlayer,
      opponent: isOpponent,
      flipped: flipped,
    })}
      onClick={onClick}
    >
      <h1>
        {cardType}
      </h1>
      <br />
      {!hideModifier && modifier !== null &&
        <div>
          modifier: {modifier.toFixed(2)}
        </div>
      }
      <br />
      {combatResult !== null && CombatResult[combatResult]}
    </div>
  )
}

export default Card
