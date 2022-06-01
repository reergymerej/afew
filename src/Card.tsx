import React from 'react'
import {CardType, CombatResult} from './types'

type CardProps = {
  cardType: CardType
  combatResult: CombatResult | null,
  modifier: number,
}

const Card: React.FunctionComponent<CardProps> = (props: CardProps) => {
  const {
    modifier,
    cardType,
    combatResult,
  } = props
  return (
    <div className="Card">
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
