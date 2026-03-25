export interface GameEntry {
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
  /** Native width of the game canvas — used for aspect ratio. Defaults to 800. */
  width?: number;
  /** Native height of the game canvas — used for aspect ratio. Defaults to 600. */
  height?: number;
  /**
   * When true, the Play page loads `public/games/_coming-soon/index.html` with
   * this game’s title / optional message until `public/games/<slug>/index.html` exists.
   */
  comingSoon?: boolean;
  /** Shown on the coming-soon page; falls back to a default blurb if omitted. */
  comingSoonMessage?: string;
}

export const games: GameEntry[] = [
  // Example entry — uncomment and adjust when you drop a build into public/games/:
  //
  // {
  //   slug: 'space-shooter',
  //   title: 'Space Shooter',
  //   description: 'A classic space shooter built with Phaser 3.',
  //   thumbnail: 'games/space-shooter/thumb.png',
  //   width: 800,
  //   height: 600,
  // },
    {
    slug: 'brick_breaker',
    title: 'Brick Breaker',
    description: 'A classic brick breaker game built with Phaser 3.',
    thumbnail: 'games/brick_breaker/thumb.png',
    width: 800,
    height: 600,
  },
  {
    slug: 'pong',
    title: 'Pong',
    description: 'A classic pong game built with Phaser 3.',
    thumbnail: 'games/pong/thumb.png',
    width: 800,
    height: 600,
  },
  {
    slug: 'catch_the_egg',
    title: 'Catch the Egg',
    description: 'A classic catch the egg game built with Phaser 3.',
    thumbnail: 'games/catch_the_egg/thumb.png',
    width: 800,
    height: 600,
    comingSoon: true,
    comingSoonMessage: 'This game is coming soon. Check back later for updates.'
  },
];
