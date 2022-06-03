import {Action, Actions, GameMode, State} from "./types"
import cx from 'classnames'

type ContinueButtonProps = {
  dispatch: React.Dispatch<Action>,
  state: State,
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
  dispatch,
  state,
}) => {
  const {
    gameMode,
    battleResolved,
    opponentIndex,
  } = state
  const opponentSelected = opponentIndex !== null
  const handleNextClick = () => {
    return dispatch({
      type: Actions.nextGameMode,
    })
  }
  const canClickNext = gameMode === GameMode.chooseCard
    || (gameMode === GameMode.chooseOpponent && opponentSelected)
    || (gameMode === GameMode.battle && battleResolved)

  const labels: {[key in GameMode]: string} = {
    [GameMode.chooseCard]: 'Begin Battle!',
    [GameMode.chooseOpponent]: 'Attack!',
    [GameMode.battle]: 'Next round',
  }

  return (
      <button
        disabled={!canClickNext}
        onClick={handleNextClick}
      >{labels[gameMode]}</button>
  )
}

type HintProps = {
  state: State,
  gameMode: GameMode,
  dispatch: React.Dispatch<Action>,
}

const Hint: React.FunctionComponent<HintProps> = ({
  gameMode,
}) => {
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
    </div>
  )
}

export default Hint
