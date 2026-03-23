import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <NavLink to="/" className={styles.logo}>
            Gamedev Demos
          </NavLink>
          <nav className={styles.nav}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${styles.tab} ${isActive ? styles.active : ''}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/games"
              className={({ isActive }) =>
                `${styles.tab} ${isActive ? styles.active : ''}`
              }
            >
              Games
            </NavLink>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
