import {useEffect, useState} from 'react';
import {Player} from 'tone';

interface PlayerState {
  isPlaying: boolean;
  duration: number;
  onStop: () => void;
  onPlay: () => void;
  onRestart: (value: number) => void;
  setAttribute: (setState: {}) => void;
  setSample: (url: string) => Promise<void>;
}

export type PlayerController = (props: {player?: Player}) => PlayerState;

export const usePlayerController: PlayerController = ({player}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setDuration(player?.buffer?.duration ?? 0);
    console.log('useEffect');
  }, []);

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
    player?.set({...setState});
  };

  const setSample = async (url: string) => {
    await player?.load(url);
  };

  return {
    isPlaying,
    duration,
    onStop,
    onPlay,
    onRestart,
    setAttribute,
    setSample,
  };
};
