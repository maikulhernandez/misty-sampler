import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FilterState} from '../store';
import {Filter} from 'tone';
import BiDirKnob from './ui/BiDirKnob';
// import Fader from './ui/Fader';

export type FilterController = (props: {filter?: Filter}) => FilterState;

export const useFilterController: FilterController = ({filter}) => {
  // const [adjusted, setAdjusted] = useState(0);

  const setFilter = (setState: {
    type?: 'lowpass' | 'highpass' | 'allpass';
    frequency?: number;
  }) => {
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
      const highPassFreq = Math.exp(min + value * (max - min));
      setFilter({type: 'highpass', frequency: highPassFreq});
      // setAdjusted(highPassFreq);
    } else if (value < 0) {
      const lowPassFreq = Math.exp(min + reverseVal * (max - min));
      setFilter({type: 'lowpass', frequency: lowPassFreq});
      // setAdjusted(lowPassFreq);
    }
  };

  return {onFilterChange};
};

interface AudioFilterProps {
  onFilterChange?: (value: number) => void;
}

const AudioFilter: React.FC<AudioFilterProps> = ({onFilterChange}) => {
  const [freq, setFreq] = useState(0);

  const changeFilter = (value: number) => {
    setFreq(value);
    onFilterChange?.call(this, value);
  };

  return (
    <div>
      <div>
        Bi Directional Filter: <br />
        Filter Type: {freq >= 0 ? 'High Pass' : 'Low Pass'}
        {/* <Fader
          min={-1}
          max={1}
          step={0.01}
          currentValue={freq}
          onChange={changeFilter}
        /> */}
        <BiDirKnob
          size={75}
          numTicks={150}
          degrees={260}
          min={-1}
          max={1}
          value={freq}
          onChange={changeFilter}
        />
        {/* {Math.round(adjusted)} Hz */}
      </div>
    </div>
  );
};

AudioFilter.propTypes = {
  onFilterChange: PropTypes.func,
};

export default AudioFilter;
