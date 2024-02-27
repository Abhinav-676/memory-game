function Card(props) {
  function handleClick() {
    props.addToSelected(props.poke)
    props.nextLevel()
  }
  if(props.poke == undefined) {
    return (
        <div onClick={handleClick} className="box is-clickable">
          <div className="image is-96x96">
           <img src={`https://bulma.io/images/placeholders/96x96.png`} />
          </div>
          <div className="is-flex">
            Name
          </div>
        </div>
    )
  } else {
    return (
        <div onClick={handleClick} className="box is-clickable">
          <div className="image is-96x96">
           <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.poke.index}.png`} />
          </div>
          <div className="is-flex">
            {props.poke.name}
          </div>
        </div>
    )
  }
}

export default Card