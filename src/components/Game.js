import React from 'react';
import Stars from './Stars';
import Answer from './Answer';
import Button from './Button';
import Numbers from './Numbers';
import DoneFrame from './DoneFrame';

var possibleCombinationSum = function (arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount; i++) {
        var combinationSum = 0;
        for (var j = 0; j < listSize; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};

class Game extends React.Component {
    static randomNumber = () => { return 1 + Math.floor(Math.random() * 9); };

    static initialState = () => {
        return {
            selectedNumbers: [],
            numberOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            usedNumbers: [],
            redraws: 5,
            doneStatus: null
        }
    };
    state = Game.initialState();

    selectNumber = (clickedNumber) => {
        if (this.state.usedNumbers.indexOf(clickedNumber) >= 0) { return; }
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };

    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }));
    };

    checkAnswer = () => {
        this.setState(
            prevState => ({
                answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
            })
        );
    };

    acceptAnswer = () => {
        this.setState(
            prevState => ({
                usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
                selectedNumbers: [],
                answerIsCorrect: null,
                numberOfStars: Game.randomNumber()
            }), this.updateDoneStatus
        );
    };

    redraw = () => {
        if (this.state.redraws === 0) {
            return;
        }
        this.setState(
            prevState => ({
                selectedNumbers: [],
                answerIsCorrect: null,
                numberOfStars: Game.randomNumber(),
                redraws: prevState.redraws - 1
            }), this.updateDoneStatus
        );
    };

    updateDoneStatus = () => {
        this.setState(
            prevState => {
                if (prevState.usedNumbers === 9) {
                    return {
                        doneStatus: 'Done. Nice!'
                    }
                }
                if (prevState.redraws === 0 && !this.posibleSolutions(prevState)) {
                    return {
                        doneStatus: 'Game Over :-('
                    }
                }
            }
        );
    };

    posibleSolutions = ({ numberOfStars, usedNumbers }) => {
        const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(number => usedNumbers.indexOf(number) === -1);
        return possibleCombinationSum(possibleNumbers, numberOfStars);
    };

    resetGame = () => {
        this.setState(
            () => {
                return Game.initialState()
            }
        );
    };

    render() {
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={this.state.numberOfStars} />
                    <Button
                        selectedNumbers={this.state.selectedNumbers}
                        checkAnswer={this.checkAnswer}
                        answerIsCorrect={this.state.answerIsCorrect}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw}
                        redraws={this.state.redraws}
                    />
                    <Answer
                        selectedNumbers={this.state.selectedNumbers}
                        unselectNumber={this.unselectNumber}
                    />
                </div>
                <br />
                {
                    this.state.doneStatus ?
                        <DoneFrame
                            doneStatus={this.state.doneStatus}
                            resetGame={this.resetGame}
                        /> :
                        <Numbers
                            selectedNumbers={this.state.selectedNumbers}
                            selectNumber={this.selectNumber}
                            usedNumbers={this.state.usedNumbers}
                        />
                }

            </div>
        );
    }
}

export default Game;