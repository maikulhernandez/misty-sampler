import {Filter} from 'tone';

export type FilterType = 'lowpass' | 'highpass' | 'bandpass';

interface FilterState {
  handleParameterChange: (newParam: {}) => void;
  convertRange: (value: number) => number;
}

export type FilterController = (props: {filter?: Filter}) => FilterState;

export const useFilterController: FilterController = ({filter}) => {
  const handleParameterChange = (newParam: {
    frequency?: number;
    Q?: number;
    type?: FilterType;
  }) => {
    filter?.set({...newParam});
  };

  const convertRange = (value: number) => {
    const min = Math.log(20);
    const max = Math.log(20000);
    const newRange = Math.floor(Math.exp(min + value * (max - min)));
    return newRange;
  };

  return {handleParameterChange, convertRange};
};
