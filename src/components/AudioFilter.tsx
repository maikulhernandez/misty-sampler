import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FilterState} from '../store';
import {Filter} from 'tone';

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

  const changeFilter = (event: React.FormEvent<HTMLInputElement>) => {
    const reversedFreq = reverseRange(Math.abs(freq), 0, 3000);
    setFreq(parseFloat(event.currentTarget.value));
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
        <input
          value={freq}
          type="range"
          min="-3000"
          max="3000"
          step="50"
          onChange={changeFilter}
        />
        {freq}
      </div>
    </div>
  );
};

AudioFilter.propTypes = {
  setFilter: PropTypes.func,
};

export default AudioFilter;
