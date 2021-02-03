import {
  Player,
  EQ3,
  Filter,
  FilterRollOff,
  ToneAudioNode,
  Destination,
  PitchShift,
} from 'tone';
import {
  FilterController,
  useFilterController,
} from '../controllers/FilterController';
import {
  PlayerController,
  usePlayerController,
} from '../controllers/PlayerController';
import {EqController, useEqController} from '../controllers/EqController';
import {
  PitchController,
  usePitchController,
} from '../controllers/PitchController';

interface AppDeps {
  playerFactory: (
    url: string,
    onLoad: () => void,
    fx?: ToneAudioNode[]
  ) => Player;
  playerController: PlayerController;

  eqFactory: () => EQ3;
  eqController: EqController;

  pitchFactory: () => PitchShift;
  pitchController: PitchController;

  filterFactory: (
    frequency: number,
    type: 'lowpass' | 'highpass' | 'bandpass',
    rolloff: FilterRollOff
  ) => Filter;
  filterController: FilterController;
}

const appDeps: AppDeps = {
  playerFactory: (url, onLoad, fx) =>
    new Player(url, onLoad).chain(...(fx ?? []), Destination),
  playerController: usePlayerController,

  eqFactory: () => new EQ3(),
  eqController: useEqController,

  filterFactory: (frequency, type, rolloff) =>
    new Filter(frequency, type, rolloff),
  filterController: useFilterController,

  pitchFactory: () => new PitchShift(),
  pitchController: usePitchController,
};

export default appDeps;
