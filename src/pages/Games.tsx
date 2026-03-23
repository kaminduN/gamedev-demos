import { useTitle } from '../hooks/useTitle';
import { games } from '../data/games';
import GameCard from '../components/GameCard';
import styles from './Games.module.css';

export default function Games() {
  useTitle('Games');

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Games</h1>
      {games.length === 0 ? (
        <p className={styles.empty}>No games yet — check back soon!</p>
      ) : (
        <div className={styles.grid}>
          {games.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
