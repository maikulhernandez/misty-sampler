import React, {useState} from 'react';
import {Volume} from 'tone';
import PropTypes from 'prop-types';

import {GainController} from '../controllers/GainController';
import BiDirKnob from './ui/BiDirKnob';
import './AudioGain.scss';

interface AudioGainProps {
  gain: Volume;
  controller: GainController;
}

const AudioGain: React.FC<AudioGainProps> = ({gain, controller}) => {
  const [gainAmount, setGainAmount] = useState(0);
  const {handleGainChange} = controller({gain});

  const changeGainLevel = (value: number) => {
    const roundedValue = Math.round(value);
    setGainAmount(roundedValue);
    handleGainChange(roundedValue);
  };

  return (
    <div className="volume-container">
      <div className="volume-knob">
        Gain: {gainAmount} dB
        <BiDirKnob
          size={50}
          numTicks={75}
          degrees={260}
          min={-12}
          max={12}
          value={gainAmount}
          onChange={changeGainLevel}
        />
      </div>
    </div>
  );
};

AudioGain.propTypes = {
  gain: PropTypes.instanceOf(Volume),
  controller: PropTypes.func,
};

export default AudioGain;
