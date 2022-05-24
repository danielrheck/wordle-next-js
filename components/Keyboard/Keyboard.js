import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { keyboardState } from './recoil';
import { inputsState } from '../Inputs/recoil';
import { makeKeyClicked, makeKeyNotClicked } from './recoilFunctions';
import {
    addKeyToInputState,
    makeNextLineActive,
    backspace,
} from '../Inputs/recoilFunctions';
import styles from './Keyboard.module.css';

export default function Keyboard(props) {
    const first_row = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const second_row = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const third_row = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    const [keyboard, setKeyboard] = useRecoilState(keyboardState);
    const [input, setInput] = useRecoilState(inputsState);

    const addKey = function (key) {
        let change = 0;
        if (first_row.indexOf(key)) {
            keyboard.map((item) => {
                if (item.key == key) {
                    if (item.wrongletter) {
                        change = 1;
                    }
                }
            });
        } else if (second_row.indexOf(key)) {
            keyboard.map((item) => {
                if (item.key == key) {
                    if (item.wrongletter) {
                        change = 1;
                    }
                }
            });
        } else if (third_row.indexOf(key)) {
            keyboard.map((item) => {
                if (item.key == key) {
                    if (item.wrongletter) {
                        change = 1;
                    }
                }
            });
        }
        if (change == 0) {
            addKeyToInputState(key, setInput, input);
        }
    };

    const handleBackspace = function () {
        backspace(setInput, input);
    };

    function getInputProps(key) {
        if (keyboard) {
            let classes = '';
            let clicked = '';
            let rightplace = '';
            let wrongplace = '';
            let wrongletter = '';
            if (keyboard[key].clicked) {
                clicked = styles.clicked;
            }
            if (keyboard[key].rightplace) {
                rightplace = styles.rightplace;
            }
            if (keyboard[key].wrongplace) {
                wrongplace = styles.wrongplace;
            }
            if (keyboard[key].wrongletter) {
                wrongletter = styles.wrongletter;
            }
            classes =
                clicked +
                ' ' +
                rightplace +
                ' ' +
                wrongplace +
                ' ' +
                wrongletter +
                ' ' +
                styles.row_key;
            return classes;
        }
    }

    const logState = function () {
        console.log(keyboard);
    };

    const clickAnimation = function (e) {
        makeKeyClicked(e, setKeyboard, keyboard);
        setTimeout(() => {
            makeKeyNotClicked(e, setKeyboard, keyboard);
        }, 50);
    };

    return (
        <>
            <button className={styles.logState} onClick={() => logState()}>
                log keyboard state
            </button>
            <button
                className={styles.logState}
                onClick={() => addKeyToInputState('a', setInput, input)}
            >
                add input key
            </button>

            <div className={styles.keyboard}>
                <div className={styles.rows}>
                    <div className={styles.keyboard_row}>
                        {first_row &&
                            first_row.map((item, idx) => {
                                return (
                                    <div
                                        id={item}
                                        key={item}
                                        className={getInputProps(idx)}
                                        onClick={(e) => {
                                            clickAnimation(e);
                                            addKey(item);
                                        }}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                    </div>

                    <div className={styles.keyboard_row}>
                        {second_row &&
                            second_row.map((item, idx) => {
                                return (
                                    <div
                                        id={item}
                                        key={item}
                                        className={getInputProps(
                                            idx + first_row.length
                                        )}
                                        onClick={(e) => {
                                            clickAnimation(e);
                                            addKey(item);
                                        }}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                    </div>

                    <div className={styles.keyboard_row}>
                        {third_row &&
                            third_row.map((item, idx) => {
                                return (
                                    <div
                                        id={item}
                                        key={item}
                                        className={getInputProps(
                                            idx +
                                                first_row.length +
                                                second_row.length
                                        )}
                                        onClick={(e) => {
                                            clickAnimation(e);
                                            addKey(item);
                                        }}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className={styles.enter_clear}>
                    <div
                        className={styles.enter_key}
                        onClick={() => {
                            props.eval();
                        }}
                    >
                        <Image
                            src='/check.png'
                            width='24px'
                            height='16px'
                            alt='Check Button'
                        ></Image>
                    </div>
                    <div
                        className={styles.enter_key}
                        onClick={() => {
                            handleBackspace();
                        }}
                    >
                        <Image
                            src='/clear.png'
                            width='24px'
                            height='16px'
                            alt='Back Button'
                        ></Image>
                    </div>
                </div>
            </div>
        </>
    );
}
