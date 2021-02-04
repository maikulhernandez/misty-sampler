// https://codepen.io/bbx/pen/QBKYOy?editors=1112

import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Knob.scss';

interface KnobProps {
  degrees: number;
  size: number;
  min: number;
  max: number;
  value: number;
  numTicks: number;
  color?: boolean;
  onChange: (value: number) => void;
}
const Knob: React.FC<KnobProps> = ({
  degrees,
  size,
  min,
  max,
  value,
  numTicks,
  color,
  onChange,
}) => {
  const convertRange = (
    oldMin: number,
    oldMax: number,
    newMin: number,
    newMax: number,
    oldValue: number
  ) => {
    return (
      ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
    );
  };

  let fullAngle = degrees;
  let startAngle = (360 - degrees) / 2;
  let endAngle = startAngle + degrees;
  let margin = size * 0.15;
  let currentDeg = Math.floor(
    convertRange(min, max, startAngle, endAngle, value)
  );
  const [degree, setDegree] = useState(currentDeg);
  const [outputVal, setOutputVal] = useState(value);

  useEffect(() => {
    onChange(outputVal);
  });

  const getDeg = (cX: number, cY: number, pts: {x: number; y: number}) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let degr = (Math.atan(y / x) * 180) / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      degr += 90;
    } else {
      degr += 270;
    }
    let finalDeg = Math.min(Math.max(startAngle, degr), endAngle);
    return finalDeg;
  };

  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const knob = e.currentTarget.getBoundingClientRect();

    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2,
    };

    const moveHandler = (e: MouseEvent): void => {
      currentDeg = getDeg(e.clientX, e.clientY, pts);
      // if (currentDeg === startAngle) currentDeg--;
      let newValue = convertRange(startAngle, endAngle, min, max, currentDeg);
      const knobOutputValue = parseFloat(newValue.toFixed(2));
      setDegree(currentDeg);
      setOutputVal(knobOutputValue);
    };

    document.addEventListener('mousemove', moveHandler);
    // eslint-disable-next-line no-unused-vars
    document.addEventListener('mouseup', e => {
      document.removeEventListener('mousemove', moveHandler);
    });
  };

  const renderTicks = () => {
    let ticks = [];
    const incr = fullAngle / numTicks;
    const newSize = margin + size / 2;
    for (let deg = startAngle; deg <= endAngle; deg += incr) {
      const tick = {
        deg: deg,
        tickStyle: {
          height: newSize + 10,
          left: newSize - 1,
          top: newSize + 2,
          transform: 'rotate(' + deg + 'deg)',
          transformOrigin: 'top',
        },
      };
      ticks.push(tick);
    }
    return ticks;
  };

  const dcpy = (o: {width: number; height: number}) => {
    return JSON.parse(JSON.stringify(o));
  };

  let kStyle = {
    width: size,
    height: size,
  };

  let iStyle = dcpy(kStyle);
  let oStyle = dcpy(kStyle);
  oStyle.margin = margin;
  if (color) {
    oStyle.backgroundImage =
      'radial-gradient(100% 70%,hsl(210, ' +
      currentDeg +
      '%, ' +
      currentDeg / 5 +
      '%),hsl(' +
      Math.random() * 100 +
      ',20%,' +
      currentDeg / 36 +
      '%))';
  }
  iStyle.transform = 'rotate(' + degree + 'deg)';

  return (
    <div className="knob" style={kStyle}>
      <div className="ticks">
        {numTicks
          ? renderTicks().map((tick, i) => (
              <div
                key={i}
                className={'tick' + (tick.deg <= currentDeg ? ' active' : '')}
                style={tick.tickStyle}
              />
            ))
          : null}
      </div>
      <div className="knob outer" style={oStyle} onMouseDown={startDrag}>
        <div className="knob inner" style={iStyle}>
          <div className="grip" />
        </div>
      </div>
    </div>
  );
};

Knob.propTypes = {
  degrees: PropTypes.number,
  size: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  numTicks: PropTypes.number,
  color: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Knob;
