function ScoreBoard(props) {

    return (
        <div>
          <div>
            Score Board
          </div>
          <div>
            Score to win: 6
          </div>
          <div>
            Current Score: {props.score}
          </div>
        </div>
    )
}

export default ScoreBoard