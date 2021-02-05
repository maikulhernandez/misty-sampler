import {
  Player,
  EQ3,
  Filter,
  FilterRollOff,
  ToneAudioNode,
  Destination,
  PitchShift,
  Chorus,
  FeedbackDelay,
  Reverb,
  Volume,
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
import {
  ChorusController,
  useChorusController,
} from '../controllers/ChorusController';
import {
  DelayController,
  useDelayController,
} from '../controllers/DelayController';
import {
  ReverbController,
  useReverbController,
} from '../controllers/ReverbController';
import {GainController, useGainController} from '../controllers/GainController';

interface AppDeps {
  playerFactory: (
    url: string,
    onLoad: () => void,
    fx?: ToneAudioNode[]
  ) => Player;
  playerController: PlayerController;

  eqFactory: () => EQ3;
  eqController: EqController;

  gainFactory: () => Volume;
  gainController: GainController;

  pitchFactory: () => PitchShift;
  pitchController: PitchController;

  filterFactory: (
    frequency: number,
    type: 'lowpass' | 'highpass' | 'bandpass',
    rolloff: FilterRollOff
  ) => Filter;
  filterController: FilterController;

  chorusFactory: () => Chorus;
  chorusController: ChorusController;

  delayFactory: () => FeedbackDelay;
  delayController: DelayController;

  reverbFactory: () => Reverb;
  reverbController: ReverbController;
}

const appDeps: AppDeps = {
  playerFactory: (url, onLoad, fx) =>
    new Player(url, onLoad).chain(...(fx ?? []), Destination),
  playerController: usePlayerController,

  eqFactory: () => new EQ3(),
  eqController: useEqController,

  gainFactory: () => new Volume(),
  gainController: useGainController,

  filterFactory: (frequency, type, rolloff) =>
    new Filter(frequency, type, rolloff),
  filterController: useFilterController,

  pitchFactory: () => new PitchShift(),
  pitchController: usePitchController,

  chorusFactory: () => new Chorus(),
  chorusController: useChorusController,

  delayFactory: () => new FeedbackDelay(),
  delayController: useDelayController,

  reverbFactory: () => new Reverb(),
  reverbController: useReverbController,
};

export default appDeps;
