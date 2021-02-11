import React, {useState, useEffect, useRef} from 'react';
import {
  Player,
  EQ3,
  Filter,
  PitchShift,
  Chorus,
  FeedbackDelay,
  Reverb,
  Volume,
} from 'tone';

import appDeps from './dependencies';
import AudioPlayer from './components/AudioPlayer';
import AudioEQ from './components/utility/AudioEq';
import AudioGain from './components/utility/AudioGain';
import AudioFilter from './components/utility/AudioFilter';
import AudioPitch from './components/effects/AudioPitch';
import AudioChorus from './components/effects/AudioChorus';
import AudioDelay from './components/effects/AudioDelay';
import AudioReverb from './components/effects/AudioReverb';
import AudioMaster from './components/AudioMaster';

const App: React.FC = () => {
  const [isPlayerLoaded, setPlayerLoaded] = useState<boolean>(false);
  const player = useRef<Player>();
  const eq = useRef<EQ3>();
  const gain = useRef<Volume>();
  const filter = useRef<Filter>();
  const pitch = useRef<PitchShift>();
  const chorus = useRef<Chorus>();
  const delay = useRef<FeedbackDelay>();
  const reverb = useRef<Reverb>();

  useEffect(() => {
    // Init app dependencies
    reverb.current = appDeps.reverbFactory();
    delay.current = appDeps.delayFactory();
    chorus.current = appDeps.chorusFactory();
    pitch.current = appDeps.pitchFactory();
    filter.current = appDeps.filterFactory(0, 'highpass', -48);
    gain.current = appDeps.gainFactory();
    eq.current = appDeps.eqFactory();
    player.current = appDeps.playerFactory(
      'heal-6.wav',
      () => setPlayerLoaded(true),
      [
        eq.current,
        gain.current,
        filter.current,
        pitch.current,
        chorus.current,
        delay.current,
        reverb.current,
      ]
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
          <AudioGain gain={gain.current} controller={appDeps.gainController} />
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
          <AudioReverb
            reverb={reverb.current}
            controller={appDeps.reverbController}
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
