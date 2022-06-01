import cx from 'classnames'
import Card from './Card'
import Die, {DieProps} from './Die'
import {State, Actions, CardType, Player, Action, GameMode} from './types'


const getNextType = (cardType: CardType, cardTypes:CardType[]): CardType => {
  const currentIndex = cardTypes.indexOf(cardType)
  const nextIndex = (currentIndex + 1) % cardTypes.length
  return cardTypes[nextIndex]
}

type PlayerCardProps = {
  isActivePlayer: boolean,
  dispatch: React.Dispatch<Action>,
  player: Player,
  state: State,
  playerIndex: number,
  attack: number,
  modifier: null | number,
  hideDie: boolean,
}
const PlayerCard: React.FunctionComponent<PlayerCardProps> = ({
  isActivePlayer,
  player,
  dispatch,
  state,
  playerIndex,
  attack,
  modifier,
  hideDie,
}) => {

  const handleChangeType = () => {
    const nextType = getNextType(player.cardType, state.types)
    dispatch({
      type: Actions.replacePlayer,
      value: {
        replaceIndex: playerIndex,
        replacePlayer: {
          ...player,
          cardType: nextType,
        },
      },
    })
  }

  const handleRoll: DieProps['onRoll'] = (value) => {
    dispatch({
      type: Actions.replacePlayer,
      value: {
        replaceIndex: playerIndex,
        replacePlayer: {
          ...player,
          dieValue: value,
        },
      },
    })
  }


  const flipped = !isActivePlayer && state.gameMode === GameMode.chooseCard
  const hideModifier = isActivePlayer && state.gameMode === GameMode.chooseCard
  const canChangeType = isActivePlayer && state.gameMode === GameMode.chooseCard

  const isOpponent = !isActivePlayer
    && state.gameMode !== GameMode.chooseCard
    && state.opponentIndex === playerIndex

  const handleCardClick = () => {
    if (state.gameMode === GameMode.chooseOpponent) {
      dispatch({
        type: Actions.selectOpponent,
        value: playerIndex,
      })
    }
  }

  return (
    <div className={cx("PlayerCard", {})}>
      <button
        onClick={handleChangeType}
        disabled={!canChangeType}
      >change type</button>

      <Card
        modifier={modifier}
        cardType={player.cardType}
        combatResult={null}
        isActivePlayer={isActivePlayer}
        flipped={flipped}
        hideModifier={hideModifier}
        isOpponent={isOpponent}
        onClick={handleCardClick}
      />
      { !hideDie &&
        <div>
          <Die
            value={player.dieValue}
            onRoll={handleRoll}
          />
          <span>attack: {attack.toFixed(2)}</span>
        </div>
      }
    </div>
  )
}

export default PlayerCard
