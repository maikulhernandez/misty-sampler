import React, {useState} from 'react';
import PropTypes from 'prop-types';
import appDeps from '../dependencies';
import BiDirKnob from './ui/BiDirKnob';
import {Filter} from 'tone';

interface AudioFilterProps {
  filter: Filter;
}

const AudioFilter: React.FC<AudioFilterProps> = ({filter}) => {
  const [freq, setFreq] = useState(0);
  const {onFilterChange} = appDeps.filterController({filter});

  const changeFilter = (value: number) => {
    setFreq(value);
    onFilterChange(value);
  };

  // console.log('i ran');

  return (
    <div>
      <div>
        Bi Directional Filter: <br />
        Filter Type: {freq >= 0 ? 'High Pass' : 'Low Pass'}
        <BiDirKnob
          size={75}
          numTicks={150}
          degrees={260}
          min={-1}
          max={1}
          value={freq}
          onChange={changeFilter}
        />
        {/* {Math.round(adjusted)} Hz */}
      </div>
    </div>
  );
};

AudioFilter.propTypes = {
  filter: PropTypes.instanceOf(Filter),
};

export default AudioFilter;
