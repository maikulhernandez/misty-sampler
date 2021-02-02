import {Filter} from 'tone';

interface FilterState {
  onFilterChange: (value: number) => void;
}

export type FilterController = (props: {filter?: Filter}) => FilterState;

export const useFilterController: FilterController = ({filter}) => {
  const setFilter = (setState: {type?: 'lowpass' | 'highpass' | 'allpass'}) => {
    filter?.set({...filter?.get(), ...setState});
  };

  const reverseRange = (num: number, min: number, max: number): number => {
    return max + min - num;
  };

  const onFilterChange = (value: number) => {
    const max = Math.log(20000);
    const min = Math.log(20);
    const reverseVal = reverseRange(Math.abs(value), 0, 1);
    if (value >= 0) {
      const highPassFreq = Math.floor(Math.exp(min + value * (max - min)));
      setFilter({type: 'highpass'});
      filter.frequency.rampTo(highPassFreq, 0.01);
    } else {
      const lowPassFreq = Math.floor(Math.exp(min + reverseVal * (max - min)));
      setFilter({type: 'lowpass'});
      filter.frequency.rampTo(lowPassFreq, 0.01);
    }
  };

  return {onFilterChange};
};
