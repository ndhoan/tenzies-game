import Die from "./components/Die"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

const App = () => {
  // generate array of 10 numbers between 1-6
  const allNewDice = () => {
    let newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  //generate new die
  const generateNewDie = () => {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    }
  }

  // set state
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)
  const [startTime, setStartTime] = useState(performance.now())
  const [timeTaken, setTimeTaken] = useState(0)
  const [bestScore, setBestScore] = useState(
    () => parseFloat(JSON.parse(localStorage.getItem("bestScore"))) || 20
  )

  // toggle isHeld property for die
  const holdDice = (id) => {
    setDice(
      dice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  // generate dice elements
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  const rollDice = () => {
    if (!tenzies) {
      setDice(
        dice.map((die) => {
          return die.isHeld ? die : generateNewDie()
        })
      )
      setCount((prevCount) => prevCount + 1)
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setCount(0)
      setTimeTaken(0)
      setStartTime(performance.now())
    }
  }

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)
    if (allHeld && allSameValue) {
      const endTime = performance.now()
      const timeTakenSec = (endTime - startTime) / 1000
      const timeTaken = parseFloat(timeTakenSec.toFixed(2))
      setTimeTaken(timeTaken)
      setTenzies(true)

      if (timeTaken < bestScore) {
        setBestScore(timeTaken)
      }
    }
  }, [dice])

  useEffect(() => {
    localStorage.setItem("bestScore", bestScore)
  }, [bestScore])

  return (
    <div className="container">
      {tenzies && <Confetti />}
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <p className="score">Best score: {bestScore} seconds</p>
        <p className="rolls">Rolls: {count}</p>
        {tenzies && <p className="result">It took you: {timeTaken} seconds</p>}
        <button onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>
      </main>
    </div>
  )
}

export default App
