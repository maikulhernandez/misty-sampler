import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {PlayerState} from '../store';
import {Player} from 'tone';
import Fader from './ui/Fader';

export type PlayerController = (props: {player?: Player}) => PlayerState;

export const usePlayerController: PlayerController = ({player}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const onPlay = () => {
    player?.start();
    setIsPlaying(true);
  };

  const onStop = () => {
    player?.stop();
    setIsPlaying(false);
  };

  const onRestart = (loopStart: number) => {
    player?.restart(loopStart);
  };

  const setAttribute = (setState: {
    playbackRate?: number;
    loopStart?: number;
    loopEnd?: number;
  }) => {
    player?.set({...player?.get(), ...setState});
  };

  return {isPlaying, onStop, onPlay, onRestart, setAttribute};
};

interface AudioPlayerProps {
  isPlaying?: boolean;
  onPlay?: () => void;
  onStop?: () => void;
  onRestart?: (value: number) => void;
  onInputChange?: ({}) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  onPlay,
  onStop,
  onRestart,
  onInputChange,
}) => {
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(189); // placeholder

  const handleOnPlay = () => {
    onPlay?.call(this);
  };

  const handleOnStop = () => {
    onStop?.call(this);
  };

  const handlePlaybackChange = (value: number) => {
    setPlaybackRate(value);
    onInputChange?.call(this, {playbackRate: value});
  };

  const handleLoopStartChange = (value: number) => {
    setLoopStart(value);
    onInputChange?.call(this, {loopStart: value});
    onRestart(value);
  };

  const handleLoopEndChange = (value: number) => {
    setLoopEnd(value);
    onInputChange?.call(this, {loopEnd: value});
  };

  return (
    <div>
      {isPlaying ? (
        <button onClick={handleOnStop}>stop</button>
      ) : (
        <button onClick={handleOnPlay}>play</button>
      )}
      <div>
        <br />
        Playback Rate:
        <Fader
          min={0}
          max={3}
          step={0.01}
          currentValue={playbackRate}
          onChange={handlePlaybackChange}
        />
      </div>
      <div>
        Loop Start:
        <Fader
          min={0}
          max={189} // placerholder
          step={0.01}
          currentValue={loopStart}
          onChange={handleLoopStartChange}
        />
      </div>
      <div>
        Loop End:
        <Fader
          min={0}
          max={189} // placeholder
          step={0.01}
          currentValue={loopEnd}
          onChange={handleLoopEndChange}
        />
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool,
  onPlay: PropTypes.func,
  onStop: PropTypes.func,
  onRestart: PropTypes.func,
  onInputChange: PropTypes.func,
};

export default AudioPlayer;
