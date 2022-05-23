import { useRecoilState, waitForAllSettled } from 'recoil';
import { useState } from 'react';
import { useEffect } from 'react';
import { inputsState } from '../Inputs/recoil';
import {
    makeFieldRightPlace,
    makeNextLineActive,
    makeFieldWrongPlace,
    makeFieldWrongLetter,
    incrementEvalIdx,
} from '../Inputs/recoilFunctions';
import Keyboard from '../Keyboard/Keyboard';
import Inputs from '../Inputs/Inputs';
import styles from './Game.module.css';

export default function Game() {
    const [inputs, setInput] = useRecoilState(inputsState);

    const rightplace = function (idx) {
        makeFieldRightPlace(idx, setInput, inputs);
    };

    const wrongplace = function (idx) {
        makeFieldWrongPlace(idx, setInput, inputs);
    };

    const wrongletter = function (idx) {
        makeFieldWrongLetter(idx, setInput, inputs);
    };

    const nextLine = function () {
        makeNextLineActive(setInput, inputs);
    };

    let rightWord = 'TRIAL';

    const letterEval = function () {
        let guess = [];
        let activeLine = [];
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].active) {
                activeLine.push(i);
                for (let u = 0; u < inputs[i].input.length; u++) {
                    guess.push(inputs[i].input[u].value);
                }
            }
        }
        if (guess.join('').length < 5) {
            return;
        }
        if (guess[inputs[6].evalIdx]) {
            if (guess[inputs[6].evalIdx] == rightArray[inputs[6].evalIdx]) {
                setTimeout(() => {
                    rightplace(inputs[6].evalIdx);
                }, 250);
            } else if (rightArray.includes(guess[inputs[6].evalIdx])) {
                setTimeout(() => {
                    wrongplace(inputs[6].evalIdx);
                }, 250);
            } else {
                setTimeout(() => {
                    wrongletter(inputs[6].evalIdx);
                }, 250);
            }
        }
    };

    const idxReset = function () {
        if (inputs[6].evalIdx == 5) {
            incrementEvalIdx(setInput, inputs);
            return;
        }
    };

    const handleclick = function () {
        idxReset();
        letterEval();
    };

    useEffect(() => {
        if (inputs[6].evalIdx == 5) {
            nextLine();
            return;
        } else {
            if (inputs[6].evalIdx < 5) {
                letterEval(inputs[6].evalIdx);
            } else if (inputs[6].evalIdx == 5) {
                resetEval[0] = false;
                incrementEvalIdx(setInput, inputs);
            }
        }
    }, [inputs[6].evalIdx]);

    let rightArray = rightWord.split('');

    return (
        <>
            <Inputs></Inputs>
            <Keyboard eval={() => handleclick()}></Keyboard>
        </>
    );
}
