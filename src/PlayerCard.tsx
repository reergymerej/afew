import cx from 'classnames'
import Card from './Card'
import Die, {DieProps} from './Die'
import {ContinueButton} from './Hint'
import {State, Actions, CardType, Player, Action, GameMode} from './types'


const getNextType = (cardType: CardType, cardTypes:CardType[]): CardType => {
  const currentIndex = cardTypes.indexOf(cardType)
  const nextIndex = (currentIndex + 1) % cardTypes.length
  return cardTypes[nextIndex]
}

type PlayerCardProps = {
  isActivePlayer: boolean,
  showChangeType: boolean,
  dispatch: React.Dispatch<Action>,
  player: Player,
  state: State,
  playerIndex: number,
  attack: null | number,
  modifier: null | number,
  hideDie: boolean,
  playerIsBattling: boolean,
}
const PlayerCard: React.FunctionComponent<PlayerCardProps> = ({
  isActivePlayer,
  showChangeType,
  player,
  dispatch,
  state,
  playerIndex,
  attack,
  modifier,
  hideDie,
  playerIsBattling,
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
      type: Actions.setPlayerDieRoll,
      value: {
        playerIndex,
        dieValue: value,
      },
    })

    // TODO: sketchy, handle in reducer by counting # of rolls
    dispatch({
      type: Actions.addBattleAttack,
      value: {
        playerIndex,
      },
    })
  }


  const flipped = (!isActivePlayer && state.gameMode === GameMode.chooseCard)
    || (state.gameMode === GameMode.battle && !playerIsBattling)
  const hideModifier = flipped
    || ( isActivePlayer && state.gameMode === GameMode.chooseCard)
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

  const showAttack = attack !== null
  return (
    <div className={cx("PlayerCard", {})}>
      <div className="Name">
        {player.name}
      </div>
      <Card
        modifier={modifier}
        cardType={player.cardType}
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
            canRoll={player.dieValue === 0
              && (state.battleAttacks || []).find(x => x.playerIndex === playerIndex) === undefined
            }
          />
          {showAttack && <span>attack: {attack.toFixed(2)}</span>}
        </div>
      }
      {showChangeType &&
        <div>
          <button
            onClick={handleChangeType}
            disabled={!canChangeType}
            >change type</button>
          <ContinueButton
            dispatch={dispatch}
            state={state}
          />
        </div>
      }

      {isOpponent &&
        <ContinueButton
          dispatch={dispatch}
          state={state}
        />
      }

    </div>
  )
}

export default PlayerCard
