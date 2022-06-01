import React from 'react'
import {CardType, CombatResult} from './types'
import cx from 'classnames'

type CardProps = {
  cardType: CardType
  combatResult: CombatResult | null,
  modifier: number,
  isActivePlayer: boolean,
  flipped: boolean,
  hideModifier: boolean,
}

const Card: React.FunctionComponent<CardProps> = (props: CardProps) => {
  const {
    modifier,
    cardType,
    combatResult,
    isActivePlayer,
    flipped,
    hideModifier,
  } = props
  return (
    <div className={cx("Card", {
      active: isActivePlayer,
      flipped: flipped,
    })}>
      <h1>
        {cardType}
      </h1>
      <br />
      {!hideModifier &&
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
