import React, {useState} from 'react';
import {PitchShift} from 'tone';
import PropTypes from 'prop-types';

import {PitchController} from '../controllers/PitchController';
import BiDirKnob from './ui/BiDirKnob';
import './AudioPitch.scss';
// import Fader from './ui/Fader';

interface AudioPitchProps {
  pitch: PitchShift;
  controller: PitchController;
}

const AudioPitch: React.FC<AudioPitchProps> = ({pitch, controller}) => {
  const [pitchShiftAmount, setPitchAmount] = useState(0);

  const {setPitchState} = controller({pitch});

  const changePitchShiftAmount = (value: number) => {
    const roundedValue = Math.round(value);
    setPitchAmount(roundedValue);
    setPitchState(roundedValue);
  };

  return (
    <div className="pitchshift-container">
      <div className="pitchshift-knob">
        PitchShifter: {pitchShiftAmount}
        <BiDirKnob
          size={100}
          numTicks={150}
          degrees={260}
          min={-12}
          max={12}
          value={pitchShiftAmount}
          onChange={changePitchShiftAmount}
        />
        {/* <Fader
          min={-12}
          max={12}
          currentValue={pitchShiftAmount}
          onChange={changePitchShiftAmount}
        /> */}
      </div>
    </div>
  );
};

AudioPitch.propTypes = {
  pitch: PropTypes.instanceOf(PitchShift),
  controller: PropTypes.func,
};

export default AudioPitch;
