import {GameMode} from "./types"
import cx from 'classnames'

type HintProps = {
  gameMode: GameMode,
}

const Hint: React.FunctionComponent<HintProps> = ({
  gameMode,
}) => {
  return (
    <ol className="Hint">
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
  )
}

export default Hint
