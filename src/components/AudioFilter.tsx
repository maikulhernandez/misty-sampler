import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {FilterController, FilterType} from '../controllers/FilterController';
import Knob from './ui/Knob';
import {Filter} from 'tone';
import './AudioFilter.scss';

interface AudioFilterProps {
  filter: Filter;
  controller: FilterController;
}

const AudioFilter: React.FC<AudioFilterProps> = ({filter, controller}) => {
  const [freq, setFreq] = useState(0);
  const [adjustedFreq, setAdjustedFreq] = useState(0);
  const [resonance, setResonance] = useState(0);
  const [filtType, setFiltType] = useState('highpass');

  const {handleParameterChange} = controller({filter});

  const convertRange = (min: number, max: number, value: number) => {
    const newMin = Math.log(min);
    const newMax = Math.log(max);
    const newRange = Math.floor(Math.exp(newMin + value * (newMax - newMin)));
    return newRange;
  };

  const changeFilterCutoff = (value: number) => {
    const cutoffFrequency = convertRange(20, 20000, value);
    setFreq(value);
    setAdjustedFreq(cutoffFrequency);
    handleParameterChange({frequency: cutoffFrequency});
  };

  const changeResonance = (event: React.FormEvent<HTMLInputElement>) => {
    const parsedInput = parseFloat(event.currentTarget.value);
    setResonance(parsedInput);
    handleParameterChange({Q: parsedInput});
  };

  const changeFilterType = (value: FilterType) => {
    setFiltType(value);
    handleParameterChange({type: value});
  };

  return (
    <div className="filter-container">
      <div className="filter-knob">
        <div className="filter-label">{filtType} Filter:</div>
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
          <button onClick={() => changeFilterType('highpass')}>Highpass</button>
        </div>
        <div>
          <button onClick={() => changeFilterType('lowpass')}>Lowpass</button>
        </div>
        <div>
          <button onClick={() => changeFilterType('bandpass')}>Bandpass</button>
        </div>
        {filtType === 'bandpass' ? (
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
        <div>{adjustedFreq} Hz</div>
      </div>
    </div>
  );
};

AudioFilter.propTypes = {
  filter: PropTypes.instanceOf(Filter),
  controller: PropTypes.func,
};

export default AudioFilter;
