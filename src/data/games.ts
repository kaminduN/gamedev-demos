export interface GameEntry {
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
  /** Native width of the game canvas — used for aspect ratio. Defaults to 800. */
  width?: number;
  /** Native height of the game canvas — used for aspect ratio. Defaults to 600. */
  height?: number;
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
];
