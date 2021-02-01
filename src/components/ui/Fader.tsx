import React from 'react';
import PropTypes from 'prop-types';
import './Fader.scss';

interface FaderProps {
  min: number;
  max: number;
  step?: number;
  currentValue: number;
  onChange: (value: number) => void;
}

const Fader: React.FC<FaderProps> = ({
  min,
  max,
  step = 1,
  currentValue,
  onChange,
}) => {
  const faderChange = (event: React.FormEvent<HTMLInputElement>) => {
    const parsedInputValue = parseFloat(event.currentTarget.value);
    onChange(parsedInputValue);
  };

  return (
    <div className="fader-container">
      <input
        type="range"
        className="fader"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={faderChange}
      />
      {currentValue.toFixed(2)}
    </div>
  );
};

Fader.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  currentValue: PropTypes.number,
  onChange: PropTypes.func,
};

export default Fader;
