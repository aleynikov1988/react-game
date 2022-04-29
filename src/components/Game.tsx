import React from 'react';
import { PlayerType } from '../player';
import { State, INIT_VALUE } from '../state';
import { calcWinner } from '../utils';
import Board from './Board';

export default class Game extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = INIT_VALUE;
      }

      getNext() {
        return this.state.whoIsNext === PlayerType.X
          ? PlayerType.O
          : PlayerType.X;
      }

      handleClick(i: number) {
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

      jumpTo(step: number) {
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
                onClick={(i: number) => this.handleClick(i)}
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
