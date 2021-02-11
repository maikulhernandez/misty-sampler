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
  const {
    isPlaying,
    duration,
    onPlay,
    onStop,
    onRestart,
    setAttribute,
    setIsReversed,
    setSample,
    currentSampleName,
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
    if (value >= 0) {
      setIsReversed(false);
      setAttribute({playbackRate: value});
    } else {
      setIsReversed(true);
      setAttribute({playbackRate: Math.abs(value)});
    }
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

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSample(e.target.files ?? undefined);
  };

  return (
    <div className="player">
      <div className="player__upload">
        <input
          type="file"
          name="file"
          id="file"
          accept="audio/*"
          onChange={onFormChange}
        />
        <label htmlFor="file">Drag a file here or click to upload audio</label>
      </div>
      <div className="player__button">
        <div className="player__sampleName">
          {currentSampleName ?? 'No sample set'}
        </div>

        {isPlaying ? (
          <button onClick={handleOnStop}>stop</button>
        ) : (
          <button onClick={handleOnPlay}>play</button>
        )}
      </div>
      <div className="player__playback">
        Playback Rate:
        <Fader
          min={-3}
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
