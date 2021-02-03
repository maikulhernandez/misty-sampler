import React, {useState} from 'react';
import {Destination} from 'tone';
import Fader from './ui/Fader';

const AudioMaster = () => {
  const [volume, setVolume] = useState(0);

  const handleMasterVolume = (value: number) => {
    setVolume(value);
    Destination.set({volume}); // todo
  };

  return (
    <div>
      Master Volume:
      <Fader
        min={-48}
        max={12}
        currentValue={volume}
        onChange={handleMasterVolume}
      />
    </div>
  );
};

export default AudioMaster;
