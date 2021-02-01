import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FilterState} from '../store';
import {Filter} from 'tone';
import Fader from './ui/Fader';

export type FilterController = (props: {filter?: Filter}) => FilterState;

export const useFilterController: FilterController = ({filter}) => {
  const setFilter = (setState: {
    type?: 'lowpass' | 'highpass' | 'allpass';
    frequency?: number;
  }) => {
    filter?.set({...filter?.get(), ...setState});
  };

  return {setFilter};
};

interface AudioFilterProps {
  setFilter?: ({}) => void;
}

const AudioFilter: React.FC<AudioFilterProps> = ({setFilter}) => {
  const [freq, setFreq] = useState(0);

  const reverseRange = (num: number, min: number, max: number): number => {
    return max + min - num;
  };

  const changeFilter = (value: number) => {
    const reversedFreq = reverseRange(Math.abs(freq), 0, 10000);
    setFreq(value);
    if (freq >= 0) {
      setFilter({type: 'highpass', frequency: freq});
    } else if (freq < 0) {
      setFilter({type: 'lowpass', frequency: reversedFreq});
    }
  };

  return (
    <div>
      <div>
        Bi Directional Filter:
        <Fader
          min={-10000}
          max={10000}
          step={50}
          currentValue={freq}
          onChange={changeFilter}
        />
      </div>
    </div>
  );
};

AudioFilter.propTypes = {
  setFilter: PropTypes.func,
};

export default AudioFilter;
