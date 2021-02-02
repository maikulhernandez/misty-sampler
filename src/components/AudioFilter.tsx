import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Knob from './ui/Knob';
import {Filter} from 'tone';
import {FilterController} from '../controllers/FilterController';

interface AudioFilterProps {
  filter: Filter;
  controller: FilterController;
}

const AudioFilter: React.FC<AudioFilterProps> = ({filter, controller}) => {
  const [freq, setFreq] = useState(0);
  const [resonance, setResonance] = useState(0);
  const {
    changeCutoff,
    setFilterType,
    setResAmount,
    adjusted,
    freqType,
  } = controller({filter});

  const changeFilterCutoff = (value: number) => {
    setFreq(value);
    changeCutoff(value);
  };

  const changeResonance = (event: React.FormEvent<HTMLInputElement>) => {
    const parsedInput = parseFloat(event.currentTarget.value);
    console.log(parsedInput);
    setResonance(parsedInput);
    setResAmount(parsedInput);
  };

  return (
    <div>
      {freqType} Filter:
      <br />
      <br />
      <Knob
        size={100}
        numTicks={150}
        degrees={260}
        min={0}
        max={1}
        value={freq}
        onChange={changeFilterCutoff}
      />
      <br />
      <br />
      <br />
      <button onClick={() => setFilterType('highpass')}>Highpass</button>
      <button onClick={() => setFilterType('lowpass')}>Lowpass</button>
      <button onClick={() => setFilterType('bandpass')}>Bandpass</button>
      {freqType === 'bandpass' ? (
        <div className="q-wrapper">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={resonance}
            onChange={changeResonance}
          />
          {resonance}
        </div>
      ) : (
        ''
      )}
      <div>{adjusted} Hz</div>
    </div>
  );
};

AudioFilter.propTypes = {
  filter: PropTypes.instanceOf(Filter),
  controller: PropTypes.func,
};

export default AudioFilter;
