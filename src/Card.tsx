import React from 'react'
import {CardType, CombatResult} from './types'
import cx from 'classnames'
import {getStyleForCardType} from './util'

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
  const style = flipped ? undefined : getStyleForCardType(cardType)
  return (
    <div className={cx("Card", {
      active: isActivePlayer,
      opponent: isOpponent,
      flipped: flipped,
    })}
      style={style}
      onClick={onClick}
    >
      <h1>
        {cardType.name}
      </h1>
      {!hideModifier && modifier !== null &&
        <div>
          {modifier.toFixed(2)}
        </div>
      }
      <br />
      {combatResult !== null && CombatResult[combatResult]}
    </div>
  )
}

export default Card
