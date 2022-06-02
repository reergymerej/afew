import React from 'react'
import {CardType} from './types'
import {getStyleForCardType} from './util'

type KeyProps = {
  cardTypes: CardType[],
}

const Key: React.FunctionComponent<KeyProps> = (props: KeyProps) => {
  const typesCopy = [
    ...props.cardTypes,
    props.cardTypes[0],
  ]
  return (
    <div>
      <div className="Key">
        { typesCopy.map((cardType, i, all) => {
        const style = getStyleForCardType(cardType)
          return (
            <div
              key={cardType.name + i}
              className="KeyItem"
              style={style}
            >
              {cardType.name} {i < all.length - 1 && '>'}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Key
