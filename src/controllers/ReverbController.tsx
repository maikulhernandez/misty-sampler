import {Reverb} from 'tone';

interface ReverbState {
  handleParameterChange: (newParam: {}) => void;
}

export type ReverbController = (props: {reverb?: Reverb}) => ReverbState;

export const useReverbController: ReverbController = ({reverb}) => {
  const handleParameterChange = (newParam: {
    wet?: number;
    preDelay?: number;
    decay?: number;
  }) => {
    reverb?.set({...newParam});
  };

  return {handleParameterChange};
};
