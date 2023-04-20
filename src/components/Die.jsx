import './Die.css'
import {
  BsDice1,
  BsDice2,
  BsDice3,
  BsDice4,
  BsDice5,
  BsDice6,
} from 'react-icons/bs'

const icons = [
  { id: 1, Icon: BsDice1 },
  { id: 2, Icon: BsDice2 },
  { id: 3, Icon: BsDice3 },
  { id: 4, Icon: BsDice4 },
  { id: 5, Icon: BsDice5 },
  { id: 6, Icon: BsDice6 },
]

const Die = (props) => {
  const { value } = props

  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
  }

  const icon = icons.find((i) => i.id === value)

  return (
    <div>
      {icon ? (
        <icon.Icon
          className="die-face"
          style={styles}
          onClick={props.holdDice}
        />
      ) : null}
    </div>
  )
}

export default Die
