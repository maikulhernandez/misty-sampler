import React, {useState} from 'react';
import {Reverb} from 'tone';
import PropTypes from 'prop-types';

import {ReverbController} from '../../controllers/ReverbController';
import Knob from '../ui/Knob';
import './AudioReverb.scss';

interface AudioReverbProps {
  reverb: Reverb;
  controller: ReverbController;
}

const AudioReverb: React.FC<AudioReverbProps> = ({reverb, controller}) => {
  const [reverbAmount, setReverbAmount] = useState(0);
  const [preDelayAmount, setPreDelayAmount] = useState(0.01);
  const [decayAmount, setDecayAmount] = useState(0.01);
  const {handleParameterChange} = controller({reverb});

  const changeReverbAmount = (value: number) => {
    setReverbAmount(value);
    handleParameterChange({wet: value});
  };

  const changePreDelayAmount = (value: number) => {
    setPreDelayAmount(value);
    handleParameterChange({preDelay: value});
  };

  const changeDecayAmount = (value: number) => {
    setDecayAmount(value);
    handleParameterChange({decay: value});
  };

  return (
    <div className="reverb">
      <div className="reverb-title">Reverb</div>
      <div className="reverb-row">
        <div className="reverb-row__amount">
          <div className="reverb-row__amount title">Amount</div>
          <Knob
            size={50}
            numTicks={75}
            degrees={260}
            min={0}
            max={1}
            value={reverbAmount}
            onChange={changeReverbAmount}
          />
        </div>
        <div className="reverb-row__preDelayTime">
          <div className="reverb-row__preDelayTime title">Predelay</div>
          <Knob
            size={50}
            numTicks={75}
            degrees={260}
            min={0.01}
            max={0.25}
            value={preDelayAmount}
            onChange={changePreDelayAmount}
          />
        </div>
        <div className="reverb-row__decay">
          <div className="reverb-row__decay title">Decay</div>
          <Knob
            size={50}
            numTicks={75}
            degrees={260}
            min={0.01}
            max={6}
            value={decayAmount}
            onChange={changeDecayAmount}
          />
        </div>
      </div>
    </div>
  );
};

AudioReverb.propTypes = {
  reverb: PropTypes.instanceOf(Reverb),
  controller: PropTypes.func,
};

export default AudioReverb;
