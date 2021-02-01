import React, {useState, useEffect, useRef} from 'react';
import {Player, Filter} from 'tone';
import {appDeps} from './deps';
import AudioPlayer from './components/AudioPlayer';
import AudioFilter from './components/AudioFilter';

const App: React.FC = () => {
  const [isPlayerLoaded, setPlayerLoaded] = useState<boolean>(false);
  const player = useRef<Player>();
  const filter = useRef<Filter>();
  const {
    isPlaying,
    onPlay,
    onStop,
    onRestart,
    setAttribute,
  } = appDeps.playerController({
    player: player.current,
  });
  const {setFilter} = appDeps.filterController({filter: filter.current});

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
            isPlaying={isPlaying}
            onPlay={onPlay}
            onStop={onStop}
            onRestart={onRestart}
            onInputChange={setAttribute}
          />
          <AudioFilter setFilter={setFilter}></AudioFilter>
        </>
      ) : (
        'loading...'
      )}
    </div>
  );
};

export default App;
