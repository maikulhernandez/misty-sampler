import React, {useState} from 'react';
import {Player} from 'tone';
import PropTypes from 'prop-types';

import {PlayerController} from '../controllers/PlayerController';
import Fader from './ui/Fader';
import './AudioPlayer.scss';

interface AudioPlayerProps {
  player: Player;
  controller: PlayerController;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({player, controller}) => {
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const {
    isPlaying,
    duration,
    onPlay,
    onStop,
    onRestart,
    setAttribute,
    setSample,
  } = controller({
    player,
  });

  const handleOnPlay = () => {
    onPlay();
  };

  const handleOnStop = () => {
    onStop();
  };

  const handlePlaybackChange = (value: number) => {
    setPlaybackRate(value);
    setAttribute({playbackRate: value});
  };

  const handleLoopStartChange = (value: number) => {
    setLoopStart(value);
    setAttribute({loopStart: value});
    onRestart(value);
  };

  const handleLoopEndChange = (value: number) => {
    setLoopEnd(value);
    setAttribute({loopEnd: value});
  };

  // this should be in the controller
  const onFormChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // @ts-ignore
    setInputValue(e.target.value);
    // @ts-ignore
    // should also be done in the controller, just dont know what type to use here
    const fileURl = URL.createObjectURL(e.target.files[0]);
    await setSample(fileURl);
  };

  return (
    <div className="player">
      <div className="player__button">
        {isPlaying ? (
          <button onClick={handleOnStop}>stop</button>
        ) : (
          <button onClick={handleOnPlay}>play</button>
        )}
      </div>
      upload audio file test
      <input
        type="file"
        accept="audio/*"
        value={inputValue}
        onChange={onFormChange}
      />
      <div className="player__playback">
        Playback Rate:
        <Fader
          min={0}
          max={3}
          step={0.01}
          currentValue={playbackRate}
          onChange={handlePlaybackChange}
        />
      </div>
      <div className="player__loopStart">
        Loop Start:
        <Fader
          min={0}
          max={duration}
          step={0.01}
          currentValue={loopStart}
          onChange={handleLoopStartChange}
        />
      </div>
      <div className="player__loopEnd">
        Loop End:
        <Fader
          min={0}
          max={duration}
          step={0.01}
          currentValue={loopEnd}
          onChange={handleLoopEndChange}
        />
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  player: PropTypes.instanceOf(Player),
  controller: PropTypes.func,
};

export default AudioPlayer;
