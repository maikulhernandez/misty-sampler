import {Player, Filter, FilterRollOff, ToneAudioNode, Destination} from 'tone';
import {
  FilterController,
  useFilterController,
} from '../controllers/FilterController';
import {
  PlayerController,
  usePlayerController,
} from '../controllers/PlayerController';

interface AppDeps {
  playerFactory: (
    url: string,
    onLoad: () => void,
    fx?: ToneAudioNode[]
  ) => Player;
  playerController: PlayerController;

  filterFactory: (
    frequency: number,
    type: 'lowpass' | 'highpass' | 'allpass',
    rolloff: FilterRollOff
  ) => Filter;
  filterController: FilterController;
}

const appDeps: AppDeps = {
  playerFactory: (url, onLoad, fx) =>
    new Player(url, onLoad).chain(...(fx ?? []), Destination),
  playerController: usePlayerController,
  filterFactory: (frequency, type, rolloff) =>
    new Filter(frequency, type, rolloff),
  filterController: useFilterController,
};

export default appDeps;
