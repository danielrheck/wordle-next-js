import { useRecoilState, waitForAllSettled } from 'recoil';
import { useState } from 'react';
import { useEffect } from 'react';
import SimpleCrypto from 'simple-crypto-js';
const { WORD_ENCRYPTION_KEY } = require('../../secrets.json');
const simpleCrypto = new SimpleCrypto(WORD_ENCRYPTION_KEY);
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
    const [word, setWord] = useState('');
    const [encryptionKey] = useState(WORD_ENCRYPTION_KEY);

    const getWord = function () {
        fetch('http://localhost:3000/api/current_word').then((res) =>
            res.json().then((data) => {
                let decrypted = simpleCrypto.decrypt(data.word);
                setWord(decrypted);
            })
        );
    };

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

    let rightWord = word;

    let rightArray = rightWord.split('');

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
        getWord();
    }, []);

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

    return (
        <>
            <Inputs></Inputs>
            <Keyboard eval={() => handleclick()}></Keyboard>
        </>
    );
}
