import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {FilterController} from '../controllers/FilterController';
import Knob from './ui/Knob';
import {Filter} from 'tone';
import './AudioFilter.scss';

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
    setResonance(parsedInput);
    setResAmount(parsedInput);
  };

  return (
    <div className="filter-container">
      <div className="filter-knob">
        <div className="filter-label">{freqType} Filter:</div>
        <Knob
          size={100}
          numTicks={150}
          degrees={260}
          min={0}
          max={1}
          value={freq}
          onChange={changeFilterCutoff}
        />
      </div>
      <div className="filter-selector">
        <div>
          <button onClick={() => setFilterType('highpass')}>Highpass</button>
        </div>
        <div>
          <button onClick={() => setFilterType('lowpass')}>Lowpass</button>
        </div>
        <div>
          <button onClick={() => setFilterType('bandpass')}>Bandpass</button>
        </div>
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
          </div>
        ) : (
          ''
        )}
        <div>{adjusted} Hz</div>
      </div>
    </div>
  );
};

AudioFilter.propTypes = {
  filter: PropTypes.instanceOf(Filter),
  controller: PropTypes.func,
};

export default AudioFilter;
