import { useRecoilState } from 'recoil';
import { keyboardState } from '../../recoil/atoms/keyboard/keyboard';
import { makeKeyClicked } from './functions';
import styles from './Keyboard.module.css';

export function Keyboard(props) {
    const first_row = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const second_row = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const third_row = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    const [keyboard, setKeyboard] = useRecoilState(keyboardState);

    const logState = function () {
        console.log(keyboard);
    };

    const click = function (e) {
        makeKeyClicked(e, setKeyboard, keyboard);
    };

    return (
        <>
            <div className={styles.keyboard}>
                <div className={styles.rows}>
                    <div className={styles.keyboard_row}>
                        {first_row &&
                            first_row.map((item, idx) => {
                                return (
                                    <div
                                        id={item}
                                        key={item}
                                        className={styles.row_key}
                                        onClick={() => logState()}
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
                                        className={styles.row_key}
                                        onClick={(e) => {
                                            click(e);
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
                                        className={styles.row_key}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className={styles.enter_clear}>
                    <div className={styles.enter_key}></div>
                    <div
                        className={styles.enter_key}
                        onClick={props.checkWord}
                    ></div>
                </div>
            </div>
        </>
    );
}
