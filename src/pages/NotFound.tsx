import { Link } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';
import styles from './NotFound.module.css';

export default function NotFound() {
  useTitle('Page Not Found');

  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>This page doesn&rsquo;t exist.</p>
      <Link to="/" className={styles.link}>
        Go home
      </Link>
    </div>
  );
}
