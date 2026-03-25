import { useParams, Link } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import { games, type GameEntry } from '../data/games';
import { useTitle } from '../hooks/useTitle';
import {
  getFullscreenElement,
  requestFullscreenOnElement,
  exitDocumentFullscreen,
  isFullscreenApiSupported,
} from '../utils/fullscreen';
import styles from './Play.module.css';

function gameIframeSrc(game: GameEntry): string {
  const base = import.meta.env.BASE_URL;
  if (game.comingSoon) {
    const q = new URLSearchParams({ title: game.title });
    if (game.comingSoonMessage) {
      q.set('message', game.comingSoonMessage);
    }
    return `${base}games/_coming-soon/index.html?${q.toString()}`;
  }
  return `${base}games/${game.slug}/index.html`;
}

export default function Play() {
  const { slug } = useParams<{ slug: string }>();
  const game = games.find((g) => g.slug === slug);
  const [loading, setLoading] = useState(true);
  const [immersive, setImmersive] = useState(false);
  const [docFullscreen, setDocFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setLoading(true);
  }, [slug]);

  useTitle(game ? game.title : 'Not Found');

  const syncDocFullscreen = useCallback(() => {
    setDocFullscreen(!!getFullscreenElement());
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', syncDocFullscreen);
    document.addEventListener('webkitfullscreenchange', syncDocFullscreen);
    return () => {
      document.removeEventListener('fullscreenchange', syncDocFullscreen);
      document.removeEventListener('webkitfullscreenchange', syncDocFullscreen);
    };
  }, [syncDocFullscreen]);

  useEffect(() => {
    if (!immersive) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setImmersive(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [immersive]);

  const exitAll = useCallback(async () => {
    setImmersive(false);
    if (getFullscreenElement()) {
      try {
        await exitDocumentFullscreen();
      } catch {
        /* ignore */
      }
    }
  }, []);

  const handleFullscreenClick = useCallback(async () => {
    if (immersive) {
      setImmersive(false);
      return;
    }
    if (getFullscreenElement()) {
      await exitAll();
      return;
    }

    const iframe = iframeRef.current;
    if (!iframe) return;

    if (!isFullscreenApiSupported()) {
      setImmersive(true);
      return;
    }

    try {
      await requestFullscreenOnElement(iframe);
    } catch {
      setImmersive(true);
    }
  }, [immersive, exitAll]);

  const inExpandedMode = immersive || docFullscreen;
  const fullscreenLabel = inExpandedMode ? 'Exit fullscreen' : 'Fullscreen';

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

  const src = gameIframeSrc(game);
  const w = game.width ?? 800;
  const h = game.height ?? 600;

  return (
    <div
      className={`${styles.container} ${immersive ? styles.containerImmersive : ''}`}
    >
      {!immersive && (
        <div className={styles.topBar}>
          <Link to="/games" className={styles.backLink}>
            &larr; Back to Games
          </Link>
          <h1 className={styles.title}>{game.title}</h1>
          <button
            type="button"
            className={styles.fullscreenBtn}
            onClick={handleFullscreenClick}
            aria-label={fullscreenLabel}
          >
            {fullscreenLabel}
          </button>
        </div>
      )}

      {immersive && (
        <button
          type="button"
          className={styles.exitFloating}
          onClick={() => void exitAll()}
          aria-label="Exit fullscreen"
        >
          Exit fullscreen
        </button>
      )}

      <div
        className={`${styles.iframeWrapper} ${immersive ? styles.iframeWrapperImmersive : ''}`}
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
          key={src}
          ref={iframeRef}
          className={styles.iframe}
          src={src}
          title={game.title}
          onLoad={() => setLoading(false)}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}
