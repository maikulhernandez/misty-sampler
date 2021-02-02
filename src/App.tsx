import React, {useState, useEffect, useRef} from 'react';
import {Player, Filter, Destination} from 'tone';
import appDeps from './dependencies';
import AudioPlayer from './components/AudioPlayer';
import AudioFilter from './components/AudioFilter';
import Fader from './components/ui/Fader';

const App: React.FC = () => {
  const [isPlayerLoaded, setPlayerLoaded] = useState<boolean>(false);
  const [volume, setVolume] = useState(0);
  const player = useRef<Player>();
  const filter = useRef<Filter>();

  useEffect(() => {
    // Init app dependencies
    filter.current = appDeps.filterFactory(0, 'allpass', -48);
    player.current = appDeps.playerFactory(
      'heal-6.wav',
      () => setPlayerLoaded(true),
      [filter.current]
    );

    player.current.set({loop: true});
  }, []);

  const handleMasterVolume = (value: number) => {
    setVolume(value);
    Destination.set({volume: volume});
  };
  console.log('app rendered');

  return (
    <div>
      {isPlayerLoaded ? (
        <>
          <AudioPlayer
            player={player.current}
            controller={appDeps.playerController}
          />
          <AudioFilter filter={filter.current}></AudioFilter>
          <div>
            Master Volume:
            <Fader
              min={-48}
              max={12}
              currentValue={volume}
              onChange={handleMasterVolume}
            />
          </div>
        </>
      ) : (
        'loading...'
      )}
    </div>
  );
};

export default App;
