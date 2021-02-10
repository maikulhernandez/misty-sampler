import {useEffect, useState} from 'react';
import {Player} from 'tone';

interface PlayerState {
  isPlaying: boolean;
  duration: number;
  onStop: () => void;
  onPlay: () => void;
  onRestart: (value: number) => void;
  setAttribute: (setState: {}) => void;
  setSample: (files?: FileList) => void;
  currentSampleName: string;
}

export type PlayerController = (props: {player?: Player}) => PlayerState;

export const usePlayerController: PlayerController = ({player}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentSampleName, setSampleName] = useState('heal-6.wav');

  useEffect(() => {
    setDuration(player?.buffer?.duration ?? 0);
  }, [currentSampleName]);

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

  const setSample = async (files?: FileList) => {
    if (files && Array.from(files).length > 0) {
      const fileName = files[0].name;
      await player
        ?.load(URL.createObjectURL(files[0]))
        .then(() => setSampleName(fileName));
      player?.stop();
      player?.start();
      setIsPlaying(true);
    }
  };

  return {
    isPlaying,
    duration,
    onStop,
    onPlay,
    onRestart,
    setAttribute,
    setSample,
    currentSampleName,
  };
};
