import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  x = 'X';
  o = 'O';

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      whoIsNext: this.x,
      stepNumber: 0,
    };
  }

  getNext() {
    return this.state.whoIsNext === this.x ? this.o : this.x;
  }

  handleClick(i) {
    // console.log(this.state.stepNumber);
    // console.log(this.state.whoIsNext);

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const actual = history[history.length - 1];
    const squares = actual.squares.slice();
    const winner = calcWinner(squares);

    if (winner || squares[i]) {
      return;
    }

    squares[i] = this.state.whoIsNext;
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      whoIsNext: this.getNext(),
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      whoIsNext: this.getNext(),
    });
  }

  render() {
    const history = this.state.history;
    const actual = history[this.state.stepNumber];
    let status = `Next player: ${this.state.whoIsNext}`;
    const winner = calcWinner(actual.squares);

    if (winner) {
      status = `Winner is ${winner}`;
    }

    const moves = history.map((element, index) => {
      const label = index === 0 ? 'Go to start' : `Go to move #${index}`;

      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{label}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={actual.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calcWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);
