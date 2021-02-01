import {Player, Filter, FilterRollOff, ToneAudioNode, Destination} from 'tone';
import {FilterController, useFilterController} from '../components/AudioFilter';
import {PlayerController, usePlayerController} from '../components/AudioPlayer';

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

export const appDeps: AppDeps = {
  playerFactory: (url, onLoad, fx) =>
    new Player(url, onLoad).chain(...(fx ?? []), Destination),
  playerController: usePlayerController,
  filterFactory: (frequency, type, rolloff) =>
    new Filter(frequency, type, rolloff),
  filterController: useFilterController,
};
