import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BiDirKnob from './ui/BiDirKnob';
import {Filter} from 'tone';
import {FilterController} from '../controllers/FilterController';

interface AudioFilterProps {
  filter: Filter;
  controller: FilterController;
}

const AudioFilter: React.FC<AudioFilterProps> = ({filter, controller}) => {
  const [freq, setFreq] = useState(0);
  const {onFilterChange} = controller({filter});

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
  controller: PropTypes.func,
};

export default AudioFilter;
