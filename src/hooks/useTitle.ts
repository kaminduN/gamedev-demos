import { useEffect } from 'react';

export function useTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} — Gamedev Demos` : 'Gamedev Demos';
    return () => {
      document.title = prev;
    };
  }, [title]);
}
