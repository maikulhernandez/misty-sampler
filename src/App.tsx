import React, {useState, useEffect, useRef} from 'react';
import {Player, Filter, EQ3} from 'tone';

import appDeps from './dependencies';
import AudioPlayer from './components/AudioPlayer';
import AudioFilter from './components/AudioFilter';
import AudioMaster from './components/AudioMaster';
import AudioEQ from './components/AudioEq';

const App: React.FC = () => {
  const [isPlayerLoaded, setPlayerLoaded] = useState<boolean>(false);
  const player = useRef<Player>();
  const filter = useRef<Filter>();
  const eq = useRef<EQ3>();

  useEffect(() => {
    // Init app dependencies
    filter.current = appDeps.filterFactory(0, 'highpass', -48);
    eq.current = appDeps.eqFactory();
    player.current = appDeps.playerFactory(
      'heal-6.wav',
      () => setPlayerLoaded(true),
      [eq.current, filter.current]
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
          <AudioEQ eq={eq.current} controller={appDeps.eqController} />
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
