import { useRecoilState } from 'recoil';
import { inputsState } from '../Inputs/recoil';
import Keyboard from '../Keyboard/Keyboard';
import Inputs from '../Inputs/Inputs';
import styles from './Game.module.css';

export default function Game() {
    const [inputs, setInput] = useRecoilState(inputsState);

    const gameEval = function () {
        console.log(inputs);
        let guess = [];
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].active) {
                for (let u = 0; u < inputs[i].input.length; u++) {
                    guess.push(inputs[i].input[u].value);
                }
            }
        }
        console.log(guess.join('').length);
    };

    return (
        <>
            <div className={styles.eval} onClick={() => gameEval()}></div>
            <Inputs></Inputs>
            <Keyboard eval={() => gameEval()}></Keyboard>
        </>
    );
}
