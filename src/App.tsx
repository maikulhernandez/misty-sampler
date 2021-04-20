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

import './App.scss';
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
          <div className="container">
            <div id="player">
              <AudioPlayer
                player={player.current}
                controller={appDeps.playerController}
              />
            </div>
            <div id="gain">
              <AudioGain
                gain={gain.current}
                controller={appDeps.gainController}
              />
            </div>
            <div id="eq">
              <AudioEQ eq={eq.current} controller={appDeps.eqController} />
            </div>
            <div id="filter">
              <AudioFilter
                filter={filter.current}
                controller={appDeps.filterController}
              />
            </div>
            <div id="pitch">
              <AudioPitch
                pitch={pitch.current}
                controller={appDeps.pitchController}
              />
            </div>
            <div id="chorus">
              <AudioChorus
                chorus={chorus.current}
                controller={appDeps.chorusController}
              />
            </div>
            <div id="delay">
              <AudioDelay
                delay={delay.current}
                controller={appDeps.delayController}
              />
            </div>
            <div id="reverb">
              <AudioReverb
                reverb={reverb.current}
                controller={appDeps.reverbController}
              />
            </div>
            <div id="master">
              <AudioMaster />
            </div>
          </div>
        </>
      ) : (
        'loading...'
      )}
    </div>
  );
};

export default App;
