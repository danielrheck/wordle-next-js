import { useRecoilState } from 'recoil';
import { inputsState } from './recoil';
import { makeInputActive } from './recoilFunctions';
import styles from './Inputs.module.css';

export default function Inputs() {
    const [inputs, setInputs] = useRecoilState(inputsState);

    function logState() {
        console.log(inputs);
    }

    const handleClick = function (field, row) {
        inputs.map((item, idx) => {
            if (item.active) {
                if (idx == row) {
                    makeInputActive(field, setInputs, inputs);
                }
            }
        });
    };

    function getInputProps(row, field) {
        if (inputs) {
            let classes = '';
            let right = '';
            let wrong = '';
            let wrongletter = '';
            let active = '';
            let base = '';
            let clicked = '';
            let activeRowKeys = '';
            if (inputs[row].input[field].rightplace) {
                right = styles.rightplace;
            }
            if (inputs[row].active) {
                activeRowKeys = styles.activeRowKeys;
            }
            if (inputs[row].input[field].wrongplace) {
                wrong = styles.wrongplace;
            }
            if (inputs[row].input[field].wrongletter) {
                wrongletter = styles.wrongletter;
            }
            if (inputs[row].input[field].active) {
                active = styles.activeinput;
            }
            if (inputs[row].input[field].clicked) {
                clicked = styles.clicked;
            }
            if (
                !inputs[row].input[field].active &&
                !inputs[row].input[field].wrongplace &&
                !inputs[row].input[field].wrongletter
            ) {
                base = styles.basecolor;
            }

            classes =
                right +
                ' ' +
                wrong +
                ' ' +
                wrongletter +
                ' ' +
                active +
                ' ' +
                activeRowKeys +
                ' ' +
                base +
                ' ' +
                clicked +
                ' ' +
                styles.inputItem;
            return classes;
        }
    }

    const inputField = [0, 1, 2, 3, 4];

    return (
        <>
            <button className={styles.logState} onClick={() => logState()}>
                log inputs state
            </button>
            <div className={styles.inputsContainer}>
                <div
                    className={`${'botar expressao condicional aqui'} ${
                        styles.inputRow
                    }`}
                >
                    {' '}
                    {inputField &&
                        inputField.map((field) => {
                            return (
                                <div
                                    onClick={() => handleClick(field, 0)}
                                    className={getInputProps(0, field)}
                                    key={field}
                                >
                                    <div className={styles.letter}>
                                        {inputs[0].input[field].value}
                                    </div>
                                </div>
                            );
                        })}{' '}
                </div>
                <div className={styles.inputRow}>
                    {inputField &&
                        inputField.map((field) => {
                            return (
                                <div
                                    onClick={() => handleClick(field, 1)}
                                    className={getInputProps(1, field)}
                                    key={field}
                                >
                                    <div className={styles.letter}>
                                        {inputs[1].input[field].value}
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className={`${styles.inputRow}`}>
                    {inputField &&
                        inputField.map((field) => {
                            return (
                                <div
                                    onClick={() => handleClick(field, 2)}
                                    className={getInputProps(2, field)}
                                    key={field + 10}
                                >
                                    <div className={styles.letter}>
                                        {inputs[2].input[field].value}
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className={styles.inputRow}>
                    {inputField &&
                        inputField.map((field) => {
                            return (
                                <div
                                    onClick={() => handleClick(field, 3)}
                                    className={getInputProps(3, field)}
                                    key={field + 15}
                                >
                                    <div className={styles.letter}>
                                        {inputs[3].input[field].value}
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className={styles.inputRow}>
                    {inputField &&
                        inputField.map((field) => {
                            return (
                                <div
                                    onClick={() => handleClick(field, 4)}
                                    className={getInputProps(4, field)}
                                    key={field + 20}
                                >
                                    <div className={styles.letter}>
                                        {inputs[4].input[field].value}
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className={styles.inputRow}>
                    {inputField &&
                        inputField.map((field) => {
                            return (
                                <div
                                    onClick={() => handleClick(field, 5)}
                                    className={getInputProps(5, field)}
                                    key={field + 20}
                                >
                                    <div className={styles.letter}>
                                        {inputs[5].input[field].value}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}
