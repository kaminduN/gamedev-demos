import { Link } from 'react-router-dom';
import type { GameEntry } from '../data/games';
import styles from './GameCard.module.css';

export default function GameCard({ game }: { game: GameEntry }) {
  const thumbUrl = game.thumbnail
    ? `${import.meta.env.BASE_URL}${game.thumbnail}`
    : undefined;

  return (
    <Link to={`/play/${game.slug}`} className={styles.card}>
      <div
        className={styles.thumb}
        style={
          thumbUrl ? { backgroundImage: `url(${thumbUrl})` } : undefined
        }
      >
        {!thumbUrl && <span className={styles.placeholder}>🎮</span>}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{game.title}</h3>
        <p className={styles.desc}>{game.description}</p>
      </div>
    </Link>
  );
}
