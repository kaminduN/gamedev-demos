import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { games } from '../data/games';
import { useTitle } from '../hooks/useTitle';
import styles from './Play.module.css';

export default function Play() {
  const { slug } = useParams<{ slug: string }>();
  const game = games.find((g) => g.slug === slug);
  const [loading, setLoading] = useState(true);

  useTitle(game ? game.title : 'Not Found');

  if (!game) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Game not found</h1>
          <p>
            No game matches &ldquo;<code>{slug}</code>&rdquo;.
          </p>
          <Link to="/games" className={styles.backLink}>
            &larr; Back to Games
          </Link>
        </div>
      </div>
    );
  }

  const src = `${import.meta.env.BASE_URL}games/${game.slug}/index.html`;
  const w = game.width ?? 800;
  const h = game.height ?? 600;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link to="/games" className={styles.backLink}>
          &larr; Back to Games
        </Link>
        <h1 className={styles.title}>{game.title}</h1>
      </div>
      <div
        className={styles.iframeWrapper}
        style={
          {
            '--game-aspect': `${w} / ${h}`,
            '--game-w': String(w),
            '--game-h': String(h),
          } as React.CSSProperties
        }
      >
        {loading && <div className={styles.loader}>Loading game&hellip;</div>}
        <iframe
          className={styles.iframe}
          src={src}
          title={game.title}
          onLoad={() => setLoading(false)}
          allow="autoplay; fullscreen"
        />
      </div>
    </div>
  );
}
