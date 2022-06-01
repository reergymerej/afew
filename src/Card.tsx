import React from 'react'
import {CardType, CombatResult} from './types'
import cx from 'classnames'

type CardProps = {
  cardType: CardType
  combatResult: CombatResult | null,
  modifier: number,
  isActivePlayer: boolean,
}

const Card: React.FunctionComponent<CardProps> = (props: CardProps) => {
  const {
    modifier,
    cardType,
    combatResult,
    isActivePlayer,
  } = props
  return (
    <div className={cx("Card", {
      active: isActivePlayer,
    })}>
      <h1>
        {cardType}
      </h1>
      <br />
      modifier: {modifier.toFixed(2)}
      <br />
      {combatResult !== null && CombatResult[combatResult]}
    </div>
  )
}

export default Card
