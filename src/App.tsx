import React, {useState, useEffect, useRef} from 'react';
import {Player, EQ3, Filter, PitchShift, Chorus, FeedbackDelay} from 'tone';

import appDeps from './dependencies';
import AudioPlayer from './components/AudioPlayer';
import AudioEQ from './components/AudioEq';
import AudioFilter from './components/AudioFilter';
import AudioPitch from './components/AudioPitch';
import AudioChorus from './components/AudioChorus';
import AudioMaster from './components/AudioMaster';
import AudioDelay from './components/AudioDelay';

const App: React.FC = () => {
  const [isPlayerLoaded, setPlayerLoaded] = useState<boolean>(false);
  const player = useRef<Player>();
  const eq = useRef<EQ3>();
  const filter = useRef<Filter>();
  const pitch = useRef<PitchShift>();
  const chorus = useRef<Chorus>();
  const delay = useRef<FeedbackDelay>();

  useEffect(() => {
    // Init app dependencies
    delay.current = appDeps.delayFactory();
    chorus.current = appDeps.chorusFactory();
    pitch.current = appDeps.pitchFactory();
    filter.current = appDeps.filterFactory(0, 'highpass', -48);
    eq.current = appDeps.eqFactory();
    player.current = appDeps.playerFactory(
      'heal-6.wav',
      () => setPlayerLoaded(true),
      [eq.current, filter.current, pitch.current, chorus.current, delay.current]
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
          <AudioPitch
            pitch={pitch.current}
            controller={appDeps.pitchController}
          />
          <AudioChorus
            chorus={chorus.current}
            controller={appDeps.chorusController}
          />
          <AudioDelay
            delay={delay.current}
            controller={appDeps.delayController}
          />
          <AudioMaster />
        </>
      ) : (
        'loading...'
      )}
    </div>
  );
};

export default App;
