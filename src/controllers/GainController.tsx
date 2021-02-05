import {Volume} from 'tone';

interface GainState {
  handleGainChange: (value: number) => void;
}

export type GainController = (props: {gain?: Volume}) => GainState;

export const useGainController: GainController = ({gain}) => {
  const handleGainChange = (value: number) => {
    gain?.set({volume: value});
    console.log(value);
  };

  return {handleGainChange};
};
