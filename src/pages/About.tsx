import { Link } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';
import styles from './About.module.css';

export default function About() {
  useTitle('About');

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>
          Game Development <span className={styles.accent}>Demos</span>
        </h1>
        <p className={styles.subtitle}>
          A collection of interactive game demos and experiments, built with
          Phaser and other web game frameworks.
        </p>
      </section>

      <section className={styles.section}>
        <h2>What's here</h2>
        <p>
          This site hosts playable demos of various game development projects.
          Each game runs directly in your browser&mdash;head over to the{' '}
          <Link to="/games">Games</Link> tab to try them out.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Links</h2>
        <ul className={styles.links}>
          <li>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
