import React, {useState} from 'react';
import {FeedbackDelay} from 'tone';
import PropTypes from 'prop-types';

import {DelayController} from '../controllers/DelayController';
import Knob from './ui/Knob';
import './AudioDelay.scss';

interface AudioDelayProps {
  delay: FeedbackDelay;
  controller: DelayController;
}

const AudioDelay: React.FC<AudioDelayProps> = ({delay, controller}) => {
  const [delayAmount, setDelayAmount] = useState(0);
  const [delayTime, setDelayTime] = useState(0);
  const [delayFeedback, setDelayFeedback] = useState(0);
  const {
    handleWetSignalChange,
    handleTimeChange,
    handleFeedbackChange,
  } = controller({delay});

  const changeDelayAmount = (value: number) => {
    setDelayAmount(value);
    handleWetSignalChange(value);
  };

  const changeDelayTime = (value: number) => {
    setDelayTime(value);
    handleTimeChange(value);
  };

  const changeDelayFeedback = (value: number) => {
    setDelayFeedback(value);
    handleFeedbackChange(value);
  };

  return (
    <div className="delay">
      <div className="delay-title">Delay</div>
      <div className="delay-row">
        <div className="delay-row__amount">
          <div className="delay-row__amount title">Amount</div>
          <Knob
            size={50}
            numTicks={75}
            degrees={260}
            min={0}
            max={1}
            value={delayAmount}
            onChange={changeDelayAmount}
          />
        </div>
        <div className="delay-row__delayTime">
          <div className="delay-row__delayTime title">Delay Time</div>
          <Knob
            size={50}
            numTicks={75}
            degrees={260}
            min={0}
            max={1}
            value={delayTime}
            onChange={changeDelayTime}
          />
        </div>
        <div className="delay-row__feedback">
          <div className="delay-row__feedback title">Feedback</div>
          <Knob
            size={50}
            numTicks={75}
            degrees={260}
            min={0}
            max={1}
            value={delayFeedback}
            onChange={changeDelayFeedback}
          />
        </div>
      </div>
    </div>
  );
};

AudioDelay.propTypes = {
  delay: PropTypes.instanceOf(FeedbackDelay),
  controller: PropTypes.func,
};

export default AudioDelay;
