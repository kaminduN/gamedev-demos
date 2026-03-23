/** Cross-browser helpers for the Fullscreen API (iframe / element). */

export function getFullscreenElement(): Element | null {
  const doc = document as Document & {
    webkitFullscreenElement?: Element | null;
    mozFullScreenElement?: Element | null;
  };
  return (
    document.fullscreenElement ??
    doc.webkitFullscreenElement ??
    doc.mozFullScreenElement ??
    null
  );
}

export function isFullscreenApiSupported(): boolean {
  const el = document.createElement('div');
  return !!(
    el.requestFullscreen ||
    (el as HTMLElement & { webkitRequestFullscreen?: () => void })
      .webkitRequestFullscreen ||
    (el as HTMLElement & { mozRequestFullScreen?: () => void })
      .mozRequestFullScreen
  );
}

export async function requestFullscreenOnElement(el: HTMLElement): Promise<void> {
  const anyEl = el as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
    mozRequestFullScreen?: () => Promise<void> | void;
  };
  if (el.requestFullscreen) {
    await el.requestFullscreen();
  } else if (anyEl.webkitRequestFullscreen) {
    await Promise.resolve(anyEl.webkitRequestFullscreen());
  } else if (anyEl.mozRequestFullScreen) {
    await Promise.resolve(anyEl.mozRequestFullScreen());
  } else {
    throw new Error('Fullscreen API not supported');
  }
}

export async function exitDocumentFullscreen(): Promise<void> {
  const doc = document as Document & {
    webkitExitFullscreen?: () => Promise<void> | void;
    mozCancelFullScreen?: () => Promise<void> | void;
  };
  if (document.exitFullscreen) {
    await document.exitFullscreen();
  } else if (doc.webkitExitFullscreen) {
    await Promise.resolve(doc.webkitExitFullscreen());
  } else if (doc.mozCancelFullScreen) {
    await Promise.resolve(doc.mozCancelFullScreen());
  }
}
