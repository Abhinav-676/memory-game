import ScoreBoard from "./components/ScoreBoard"
import Card from "./components/Card"
import { useEffect, useState } from "react"

let pokeList = []
let selected = []
const initialLevel = {level: 0,}

async function fetchPoke() {
  const list = []
  let r = Math.floor(Math.random() * 16)

  await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")

  .then(res => {
    return res.json()
    })

  .then(res => {
    for(let i = 0; i < 6; i++) {
      const url = res.results[i + r].url
      const pokeIndex = url.split('/')[url.split('/').length - 2];
      const pokeName = res.results[i + r].name 
      const newPoke = {
        name: pokeName,
        index: pokeIndex,
      }
      
      list.push(newPoke)
    }
  })

  return list
}

function App() {
  const [currentLevel, setLevel] = useState(initialLevel)
  const [gameOver, setOver] = useState(false)

  function nextLevel() {
    setLevel(prevLevel => {
      return {...prevLevel, level: prevLevel.level + 1}
    })
  }

  function resetLevel(list) {
    selected = []
    pokeList = list
    setOver(false)
    setLevel(initialLevel)
  }

  function addToSelected(poke) {
    if (selected.indexOf(poke) == -1) {
      selected.push(poke)
    } else {
      setOver(true)
    }
  }

  useEffect(()=> {
    fetchPoke().then((list) => {
      pokeList = list
      setLevel({level: 0,})
    })
  }, [])

  pokeList.sort(() => Math.random() - 0.5)
  
  if (gameOver == true) {
    return (
      <div className="section is-flex is-align-items-center is-flex-direction-column">
        <div>
         You loose...!
        </div>
        <button onClick={() => {
          fetchPoke().then((list) => {
            resetLevel(list)
          })
        }} className="button">
          Play Again
        </button>
      </div>
    )
  }

  if (currentLevel.level == 6) {
    return (
      <div className="section is-flex is-align-items-center is-flex-direction-column">
        <div>
         YOU HAVE WON!!
        </div>
        <button onClick={() => {
          fetchPoke().then((list) => {
            resetLevel(list)
          })
        }} className="button">
          Play Again
        </button>
      </div>
    )
  }

  return (
    <div className="container is-flex is-align-items-center is-flex-direction-column">
      <div className="pb-2">
        <ScoreBoard score={currentLevel.level} />
      </div>
      <div>
        <table className="table">
          <tbody>
            <tr>
              <td><Card addToSelected={addToSelected} poke={pokeList[0]} nextLevel={nextLevel}/></td>
              <td><Card addToSelected={addToSelected} poke={pokeList[1]} nextLevel={nextLevel}/></td>
              <td><Card addToSelected={addToSelected} poke={pokeList[2]} nextLevel={nextLevel}/></td>
            </tr>
            <tr>
              <td><Card addToSelected={addToSelected} poke={pokeList[3]} nextLevel={nextLevel}/></td>
              <td><Card addToSelected={addToSelected} poke={pokeList[4]} nextLevel={nextLevel}/></td>
              <td><Card addToSelected={addToSelected} poke={pokeList[5]} nextLevel={nextLevel}/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
  
}

export default App