import React, {useState, useEffect, useRef} from 'react';
import {Player, Filter} from 'tone';
import appDeps from './dependencies';
import AudioPlayer from './components/AudioPlayer';
import AudioFilter from './components/AudioFilter';
import AudioMaster from './components/AudioMaster';

const App: React.FC = () => {
  const [isPlayerLoaded, setPlayerLoaded] = useState<boolean>(false);
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

  return (
    <div>
      {isPlayerLoaded ? (
        <>
          <AudioPlayer
            player={player.current}
            controller={appDeps.playerController}
          />
          <AudioFilter
            filter={filter.current}
            controller={appDeps.filterController}
          ></AudioFilter>
          <AudioMaster />
        </>
      ) : (
        'loading...'
      )}
    </div>
  );
};

export default App;
