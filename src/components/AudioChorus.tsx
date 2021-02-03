import React, {useState} from 'react';
import {Chorus} from 'tone';
import PropTypes from 'prop-types';

import {ChorusController} from '../controllers/ChorusController';
import Knob from './ui/Knob';
import './AudioChorus.scss';

interface AudioChorusProps {
  chorus: Chorus;
  controller: ChorusController;
}

const AudioChorus: React.FC<AudioChorusProps> = ({chorus, controller}) => {
  const [chorusAmount, setChorusAmount] = useState(0);
  const [chorusDepth, setChorusDepth] = useState(0);
  const [chorusSpread, setChorusSpread] = useState(0);
  const [chorusFrequency, setChorusFrequency] = useState(0);
  const [chorusDelay, setChorusDelay] = useState(0);
  const [chorusFeedback, setChorusFeedback] = useState(0);

  const {
    isActive,
    handleOnStart,
    handleOnStop,
    handleWetSignalChange,
    handleDepthChange,
    handleSpreadChange,
    handleFrequencyChange,
    handleDelayChange,
    handleFeedbackChange,
  } = controller({chorus});

  const changeChorusAmount = (value: number) => {
    setChorusAmount(value);
    handleWetSignalChange(value);
  };

  const changeChorusDepth = (value: number) => {
    setChorusDepth(value);
    handleDepthChange(value);
  };

  const changeChorusSpread = (value: number) => {
    const roundedValue = Math.round(value);
    setChorusSpread(roundedValue);
    handleSpreadChange(roundedValue);
  };

  const changeChorusFrequency = (value: number) => {
    setChorusFrequency(value);
    handleFrequencyChange(value);
  };

  const changeChorusDelay = (value: number) => {
    setChorusDelay(value);
    handleDelayChange(value);
  };

  const changeChorusFeedback = (value: number) => {
    setChorusFeedback(value);
    handleFeedbackChange(value);
  };

  return (
    <div className="chorus">
      <div className="chorus-title">Chorus</div>
      <div className="chorus-button">
        {isActive ? (
          <button onClick={handleOnStop}>LFO OFF</button>
        ) : (
          <button onClick={handleOnStart}>LFO ON</button>
        )}
      </div>
      <div className="chorus-top">
        <div className="chorus-top__amount">
          <div className="chorus-top__amount title">Amount</div>
          <Knob
            size={50}
            numTicks={75}
            degrees={260}
            min={0}
            max={1}
            value={chorusAmount}
            onChange={changeChorusAmount}
          />
        </div>
        <div className="chorus-top__depth">
          <div className="chorus-top__depth title">Depth</div>
          <Knob
            size={50}
            numTicks={75}
            degrees={260}
            min={0}
            max={1}
            value={chorusDepth}
            onChange={changeChorusDepth}
          />
        </div>
        <div className="chorus-top__spread">
          <div className="chorus-top__spread title">Spread</div>
          <Knob
            size={50}
            numTicks={75}
            degrees={260}
            min={0}
            max={180}
            value={chorusSpread}
            onChange={changeChorusSpread}
          />
        </div>
      </div>
      <div className="chorus-bottom">
        <div className="chorus-bottom__frequency">
          <div className="chorus-bottom__frequency title">Frequency</div>
          <Knob
            size={50}
            numTicks={75}
            degrees={260}
            min={0}
            max={5}
            value={chorusFrequency}
            onChange={changeChorusFrequency}
          />
        </div>
        <div className="chorus-bottom__delay">
          <div className="chorus-bottom__delay title">Delay</div>
          <Knob
            size={50}
            numTicks={75}
            degrees={260}
            min={0}
            max={20}
            value={chorusDelay}
            onChange={changeChorusDelay}
          />
        </div>
        <div className="chorus-bottom__feedback">
          <div className="chorus-bottom__feedback title">Feedback</div>
          <Knob
            size={50}
            numTicks={75}
            degrees={260}
            min={0}
            max={1}
            value={chorusFeedback}
            onChange={changeChorusFeedback}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

AudioChorus.propTypes = {
  chorus: PropTypes.instanceOf(Chorus),
  controller: PropTypes.func,
};

export default AudioChorus;
