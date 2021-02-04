import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {EqController} from '../controllers/EqController';
import BiDirKnob from './ui/BiDirKnob';
import {EQ3} from 'tone';
import './AudioEq.scss';

interface AudioEqProps {
  eq: EQ3;
  controller: EqController;
}

const AudioEq: React.FC<AudioEqProps> = ({eq, controller}) => {
  const [lowLevel, setLowLevel] = useState(0);
  const [midLevel, setMidLevel] = useState(0);
  const [highLevel, setHighLevel] = useState(0);
  const {handleLevelChange} = controller({eq});

  const changeLowEQ = (value: number) => {
    const roundedValue = Math.round(value);
    setLowLevel(roundedValue);
    handleLevelChange({low: roundedValue});
  };

  const changeMidEQ = (value: number) => {
    const roundedValue = Math.round(value);
    setMidLevel(roundedValue);
    handleLevelChange({mid: roundedValue});
  };

  const changeHighEQ = (value: number) => {
    const roundedValue = Math.round(value);
    setHighLevel(roundedValue);
    handleLevelChange({high: roundedValue});
  };

  return (
    <div className="eq-knobs">
      <div className="eq-knobs-low">
        Low: {lowLevel} dB
        <BiDirKnob
          size={75}
          numTicks={150}
          degrees={260}
          min={-12}
          max={12}
          value={lowLevel}
          onChange={changeLowEQ}
        />
      </div>
      <div className="eq-knobs-mid">
        Mid: {midLevel} dB
        <BiDirKnob
          size={75}
          numTicks={150}
          degrees={260}
          min={-12}
          max={12}
          value={midLevel}
          onChange={changeMidEQ}
        />
      </div>
      <div className="eq-knobs-high">
        High: {highLevel} dB
        <BiDirKnob
          size={75}
          numTicks={150}
          degrees={260}
          min={-12}
          max={12}
          value={highLevel}
          onChange={changeHighEQ}
        />
      </div>
    </div>
  );
};

AudioEq.propTypes = {
  eq: PropTypes.instanceOf(EQ3),
  controller: PropTypes.func,
};

export default AudioEq;
