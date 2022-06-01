import {Action, Actions, GameMode} from "./types"
import cx from 'classnames'

type HintProps = {
  gameMode: GameMode,
  dispatch: React.Dispatch<Action>,
  opponentSelected: boolean,
}

const Hint: React.FunctionComponent<HintProps> = ({
  gameMode,
  dispatch,
  opponentSelected,
}) => {
  const handleNextClick = () => {
    return dispatch({
      type: Actions.nextGameMode,
    })
  }
  const canClickNext = gameMode === GameMode.chooseCard
    || (gameMode === GameMode.chooseOpponent && opponentSelected)
  return (
    <div className="Hint">
      <ol>
        <li className={cx({active: gameMode === GameMode.chooseCard })}>
          Choose your card to play.
        </li>
        <li className={cx({active: gameMode === GameMode.chooseOpponent })}>
          Choose opponent.
        </li>
        <li className={cx({active: gameMode === GameMode.battle })}>
          Roll die.
        </li>
      </ol>
      <button
        disabled={!canClickNext}
        onClick={handleNextClick}
        >next</button>
    </div>
  )
}

export default Hint
