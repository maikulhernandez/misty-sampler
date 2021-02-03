import {useState} from 'react';
import {Filter} from 'tone';

interface FilterState {
  changeCutoff: (value: number) => void;
  setFilterType: (value: 'lowpass' | 'highpass' | 'bandpass') => void;
  setResAmount: (value: number) => void;
  adjusted: number;
  freqType: string;
}

export type FilterController = (props: {filter?: Filter}) => FilterState;

export const useFilterController: FilterController = ({filter}) => {
  const [adjusted, setAdjusted] = useState(0);
  const [freqType, setFreqType] = useState('highpass');

  const changeCutoff = (value: number) => {
    const max = Math.log(20000);
    const min = Math.log(20);
    const cutoffFreq = Math.floor(Math.exp(min + value * (max - min)));

    setAdjusted(cutoffFreq);
    filter.set({frequency: cutoffFreq});
  };

  const setFilterType = (value: 'lowpass' | 'highpass' | 'bandpass') => {
    setFreqType(value);
    filter.set({type: value});
  };

  const setResAmount = (value: number) => {
    filter.set({Q: value});
  };

  return {changeCutoff, setFilterType, setResAmount, adjusted, freqType};
};
