export interface PlayerState {
  isPlaying: boolean;
  onStop: () => void;
  onPlay: () => void;
  onRestart: (value: number) => void;
  setAttribute: (setState: {}) => void;
}

export interface FilterState {
  setFilter: (setState: {}) => void;
}
