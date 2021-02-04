import React, {useState} from 'react';
import {Player} from 'tone';
import PropTypes from 'prop-types';

import {PlayerController} from '../controllers/PlayerController';
import Fader from './ui/Fader';

interface AudioPlayerProps {
  player: Player;
  controller: PlayerController;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({player, controller}) => {
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(189); // placeholder
  const {isPlaying, onPlay, onStop, onRestart, setAttribute} = controller({
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
          max={189} // placeholder
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
  player: PropTypes.instanceOf(Player),
  controller: PropTypes.func,
};

export default AudioPlayer;
