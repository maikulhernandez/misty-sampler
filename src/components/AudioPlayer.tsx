import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {PlayerState} from '../store';
import {Player} from 'tone';

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
  const [loopEnd, setLoopEnd] = useState(1);

  const handleOnPlay = () => {
    onPlay?.call(this);
  };

  const handleOnStop = () => {
    onStop?.call(this);
  };

  const handlePlaybackChange = (event: React.FormEvent<HTMLInputElement>) => {
    const parsedInputValue = parseFloat(event.currentTarget.value);
    setPlaybackRate(parsedInputValue);
    onInputChange?.call(this, {playbackRate: parsedInputValue});
  };

  const handleLoopStartChange = (event: React.FormEvent<HTMLInputElement>) => {
    const parsedInputValue = parseFloat(event.currentTarget.value);
    setLoopStart(parsedInputValue);
    onInputChange?.call(this, {loopStart: parsedInputValue});
    onRestart(parsedInputValue);
  };

  const handleLoopEndChange = (event: React.FormEvent<HTMLInputElement>) => {
    const parsedInputValue = parseFloat(event.currentTarget.value);
    setLoopEnd(parsedInputValue);
    onInputChange?.call(this, {loopEnd: parsedInputValue});
  };

  return (
    <div>
      {isPlaying ? (
        <button onClick={handleOnStop}>stop</button>
      ) : (
        <button onClick={handleOnPlay}>play</button>
      )}
      <div>
        Playback Rate:
        <input
          value={playbackRate}
          type="range"
          min="0.00"
          max="3"
          step="0.05"
          onChange={handlePlaybackChange}
        />
        {playbackRate}
      </div>
      <div>
        loopStart
        <input
          value={loopStart}
          type="range"
          min="0"
          max="189"
          step="1"
          onChange={handleLoopStartChange}
        />
        {loopStart}
      </div>
      <div>
        loopEnd
        <input
          value={loopEnd}
          type="range"
          min="0"
          max="189"
          step="1"
          onChange={handleLoopEndChange}
        />
        {loopEnd}
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
