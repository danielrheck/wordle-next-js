import { useRecoilState, waitForAllSettled } from 'recoil';
import { useState } from 'react';
import { useEffect } from 'react';
import { inputsState } from '../Inputs/recoil';
import { keyboardState } from '../Keyboard/recoil';
import {
    makeFieldRightPlace,
    makeNextLineActive,
    makeFieldWrongPlace,
    makeFieldWrongLetter,
    incrementEvalIdx,
} from '../Inputs/recoilFunctions';
import {
    makeKeyRightPlace,
    makeKeyWrongPlace,
    makeKeyWrongLetter,
} from '../Keyboard/recoilFunctions';
import Keyboard from '../Keyboard/Keyboard';
import Inputs from '../Inputs/Inputs';
import styles from './Game.module.css';

const transitionTime = 315;

export default function Game() {
    const [inputs, setInput] = useRecoilState(inputsState);
    const [keyboard, setKeyboard] = useRecoilState(keyboardState);

    const rightplace = function (idx) {
        makeFieldRightPlace(idx, setInput, inputs);
    };

    const wrongplace = function (idx) {
        makeFieldWrongPlace(idx, setInput, inputs);
    };

    const wrongletter = function (idx) {
        makeFieldWrongLetter(idx, setInput, inputs);
    };

    const keyRightPlace = function (key) {
        makeKeyRightPlace(key, setKeyboard, keyboard);
    };

    const keyWrongPlace = function (key) {
        makeKeyWrongPlace(key, setKeyboard, keyboard);
    };

    const keyWrongLetter = function (key) {
        makeKeyWrongLetter(key, setKeyboard, keyboard);
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
                    keyRightPlace(guess[inputs[6].evalIdx]);
                    rightplace(inputs[6].evalIdx);
                }, transitionTime);
            } else if (rightArray.includes(guess[inputs[6].evalIdx])) {
                setTimeout(() => {
                    keyWrongPlace(guess[inputs[6].evalIdx]);
                    wrongplace(inputs[6].evalIdx);
                }, transitionTime);
            } else {
                setTimeout(() => {
                    keyWrongLetter(guess[inputs[6].evalIdx]);
                    wrongletter(inputs[6].evalIdx);
                }, transitionTime);
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
