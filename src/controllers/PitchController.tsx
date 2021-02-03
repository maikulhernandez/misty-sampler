import {PitchShift} from 'tone';

interface PitchState {
  setPitchState: (value: number) => void;
}

export type PitchController = (props: {pitch?: PitchShift}) => PitchState;

export const usePitchController: PitchController = ({pitch}) => {
  const setPitchState = (value: number) => {
    pitch.set({pitch: value});
  };
  return {setPitchState};
};
