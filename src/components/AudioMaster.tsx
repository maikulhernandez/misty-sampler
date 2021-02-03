import React, {useState} from 'react';
import {Destination} from 'tone';

import Fader from './ui/Fader';
import './AudioMaster.scss';

const AudioMaster = () => {
  const [volume, setVolume] = useState(0);

  const handleMasterVolume = (value: number) => {
    setVolume(value);
    Destination.set({volume}); // todo
  };

  return (
    <div className="master-fader">
      <div className="master-fader__title">Master Volume:</div>
      <div className="master-fader__fader">
        <Fader
          min={-48}
          max={12}
          currentValue={volume}
          onChange={handleMasterVolume}
        />
      </div>
    </div>
  );
};

export default AudioMaster;
