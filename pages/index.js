import styles from '../styles/Home.module.css';
import Game from '../components/Game/Game.js';

export default function Home() {
    return (
        <div className={styles.body}>
            <Game></Game>
        </div>
    );
}
