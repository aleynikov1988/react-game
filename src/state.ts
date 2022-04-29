import { PlayerType } from "./player"

export type State = {
    history: any[],
    whoIsNext: PlayerType,
    stepNumber: number
}

export const INIT_VALUE: State = {
    history: [{
        squares: Array(9).fill(null),
    }],
    whoIsNext: PlayerType.X,
    stepNumber: 0
}
