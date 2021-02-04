import {Filter} from 'tone';

export type FilterType = 'lowpass' | 'highpass' | 'bandpass';

interface FilterState {
  handleParameterChange: (newParam: {}) => void;
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

  console.log('filter');

  return {handleParameterChange};
};
