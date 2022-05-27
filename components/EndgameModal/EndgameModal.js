import styles from './EndgameModal.module.css';

export default function Inputs(props) {
    return (
        <>
            <div className={styles.modalCover}>
                <div className={styles.modal}>
                    {props.isGuessCorrect && (
                        <div className={styles.win}>You win!</div>
                    )}
                    {!props.isGuessCorrect && (
                        <div className={styles.lose}>You lose!</div>
                    )}
                </div>
            </div>
        </>
    );
}
