import React from 'react'
import {CardType} from './types'
import cx from 'classnames'
import {getStyleForCardType} from './util'

type CardProps = {
  cardType: CardType
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
    </div>
  )
}

export default Card
